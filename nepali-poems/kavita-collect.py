#!/usr/bin/env python

from lxml import html
import requests
import os
import signal
import json
import sys

from time import sleep
from utils import detect_lang

global ctrlc
ctrlc = False
def signal_handler(signal, frame):
    global ctrlc
    ctrlc = True
signal.signal(signal.SIGINT, signal_handler)


website = "http://kavitakosh.org"
page = requests.get(website + '/kk/%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A5%80')
tree = html.fromstring(page.content)
source = tree.xpath('//title')[0].text

links = tree.xpath('//div[@class="multi-col-list div-with-shadow"]/ul/li')

for linkElem in links:
    if ctrlc:
        quit()
    else:
        data = {}
        author, link = linkElem.xpath('./a/@title')[0], linkElem.xpath('./a/@href')[0]
        data['author'] = author
        data['genre'] = "कविता"
        url = website + link
        author_page = requests.get(url)
        data['source_link'] = url
        data['source'] = source
        poem_links = html.fromstring(author_page.content).xpath('//div[@id="mw-content-text"]/ul/li/a')
        dir = os.path.join("kavitakosh", author)
        if not os.path.exists(dir):
            os.makedirs(dir)
        # print(author)
        for poem_link in poem_links:
            sleep(1)
            if ctrlc:
                quit()
            else:
                link2, title = poem_link.xpath('./@href')[0], poem_link.xpath('./@title')[0]
                data['title'] = title
                poem_page = requests.get(website + link2)
                poem = html.fromstring(poem_page.content).xpath('//div[@class="poem"]/p/text()')
                poem_str = "".join(poem).strip()
                if poem_str:
                    data['text'] = poem_str
                    lang = detect_lang(poem_str)
                    if lang == "ne":
                        data['lang'] = "नेपाली"
                    else:
                        with open(os.path.join(dir, "undetected.txt"), "a") as f:
                            f.write(lang + "\n")
                            f.write(poem_str + "\n")
                        continue

                    with open(os.path.join(dir, title.split('/')[0]) + '.txt', "w") as f:
                        f.write(json.dumps(data))
