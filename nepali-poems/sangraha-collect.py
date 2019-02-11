#!/usr/bin/env python

from lxml import html
import requests
import os
import signal
import sys
import json
import time

from utils import detect_lang, lang_detect_exception
from time import sleep
from pathlib import Path

global ctrlc
ctrlc = False
def signal_handler(signal, frame):
    global ctrlc
    ctrlc = True
signal.signal(signal.SIGINT, signal_handler)

def write_file(author_dir, filename):
    ''' Return true if written, False if already exists '''

    sahitya_file = Path(os.path.join(author_dir, filename.replace('/', ' वा ')))
    if sahitya_file.is_file():
        return False
    else:
        with open(sahitya_file, 'w') as f:
            f.write(json.dumps(data))
        return True

website = "http://sahityasangraha.com"

page = requests.get(website)
tree = html.fromstring(page.content)
source = tree.xpath('//title')[0].text
links = tree.xpath('//ul[@id="menu-sahitya-bidhaa"]/li/a')

to_collect = ["नेपाली कथा", "लघुकथा", "नेपाली उपन्यास", "नाटक", "नेवारी रचना", "मैथिली रचना", "भोजपुरी रचना", "हास्य – व्यङ्ग्य"]
lang_map = {"नेवारी रचना":"नेवारी", "मैथिली रचना":"मैथिली", "भोजपुरी रचना": "भोजपुरी"}
genre_map = { "नेपाली कथा":"कथा", "लघुकथा": "लघुकथा", "नेपाली उपन्यास": "उपन्यास", "नाटक": "नाटक", "हास्य – व्यङ्ग्य": "हास्य – व्यङ्ग्य"}
with_menu = ["नेपाली काव्य", "बाल साहित्य", "अनुवादित साहित्य", "अडिओ साहित्य", "संस्मरण | नियात्रा"]

for linkElem in links:
    if ctrlc:
        quit()
    else:
        sahitya_types, links = linkElem.xpath('./text()'), linkElem.xpath('./@href')
        if not sahitya_types or not links:
            print(sahitya_types, links)
        if sahitya_types[0] in with_menu:
            continue
        sahitya_type, link = sahitya_types[0], links[0]
        if(sahitya_type in to_collect):
            dir = os.path.join("sahitya-sangraha", sahitya_type)
            if not os.path.exists(dir):
                os.makedirs(dir)

            collection_page = requests.get(link)
            collection_links = html.fromstring(collection_page.content).xpath('//h2[@class="entry-title"]/a')

            to_sleep = True
            for collection_link in collection_links:
                if to_sleep:
                    sleep(1)
                if ctrlc:
                    quit()
                else:
                    data = { 'source': source, 'source_link': link}
                    if sahitya_type in genre_map:
                        print('genre: ' + genre_map[sahitya_type])
                        data['genre'] = genre_map[sahitya_type]
                    collection_link, title = collection_link.xpath('./@href')[0], collection_link.xpath('./text()')[0]
                    data['title'] = title
                    sahitya_page = requests.get(collection_link)
                    sahitya_content = html.fromstring(sahitya_page.content).xpath('//div[@id="content"]')[0]

                    data['publish_date'] = sahitya_content.xpath('//div[@class="entry-meta"]/a/span/text()')[0]

                    if len(sahitya_content.xpath('//div[@class="entry-content"]/div[not(@*)]')) > 4:
                        print("Continue")
                        continue
                    content = sahitya_content.xpath('//div[@class="entry-content"]/p')
                    author = content[0].xpath('//strong/text()')[0]
                    data['author'] = author
                    content_str = ''.join(map(lambda x: html.tostring(x, encoding='unicode', pretty_print = True), content[1:]))
                    data['text'] = content_str
                    if sahitya_type in lang_map:
                        data['lang'] = lang_map[sahitya_type]
                    else:
                        try:
                            lang = detect_lang(content_str)
                        except lang_detect_exception.LangDetectException:
                            print("error caught")
                            continue
                        except Exception:
                            print("Exception")
                            continue
                        if lang == 'ne':
                            data['lang'] = "नेपाली"
                        elif lang == 'hi':
                            data['lang'] = "हिन्दी"
                        # elif lang == 'Unknown':
                            # data['lang'] = lang
                        else:
                            continue

                    author_dir = os.path.join(dir, author)
                    if not os.path.exists(author_dir):
                        os.makedirs(author_dir)
                    to_sleep = write_file(author_dir, title)
