#!/usr/bin/env python

from lxml import html
import requests
import os
import signal
import sys
import json
import time

from time import sleep

global ctrlc
ctrlc = False
def signal_handler(signal, frame):
    global ctrlc
    ctrlc = True
signal.signal(signal.SIGINT, signal_handler)

website = "http://sahityasangraha.com"

page = requests.get(website)
tree = html.fromstring(page.content)

links = tree.xpath('//ul[@id="menu-sahitya-bidhaa"]/li/a')
to_collect = ["नेपाली कथा", "Engलघुकथा", "नेपाली उपन्यास", "नाटक", "नेवारी रचना", "मैथिली रचना", "भोजपुरी रचना", "हास्य – व्यङ्ग्य"]
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
            dir = os.path.join("sangraha-data", sahitya_type)
            if not os.path.exists(dir):
                os.makedirs(dir)

            collection_page = requests.get(link)
            collection_links = html.fromstring(collection_page.content).xpath('//h2[@class="entry-title"]/a')
            # print(collection_links)

            for collection_link in collection_links:
                sleep(1)
                if ctrlc:
                    quit()
                else:
                    data = {}
                    collection_link, title = collection_link.xpath('./@href')[0], collection_link.xpath('./text()')[0]
                    data['title'] = title
                    print('Collection link: ', collection_link, "and title: ", title)
                    # with open(os.path.join(dir, title)) as f:
                    sahitya_page = requests.get(collection_link)
                    sahitya_content = html.fromstring(sahitya_page.content).xpath('//div[@id="content"]')[0]

                    data['author_date'] = sahitya_content.xpath('//div[@class="entry-meta"]/a/span/text()')[0]

                    content = sahitya_content.xpath('//div[@class="entry-content"]/p')
                    author = content[0].xpath('//strong/text()')[0]
                    print('author: ', author)
                    data['author'] = author
                    content_str = ''.join(map(lambda x: html.tostring(x, encoding='unicode', pretty_print = True), content[1:]))
                    data['content'] = content_str
                    print(content_str)

                    author_dir = os.path.join(dir, author)
                    if not os.path.exists(author_dir):
                        os.makedirs(author_dir)
                    with open(os.path.join(author_dir, title), 'w') as f:
                        f.write(json.dumps(data))
                        # print(html.tostring(content[0], pretty_print = True))
                        # for cont in content[1:]:
                        #     f.write(html.tostring(cont, encoding='unicode', pretty_print = True))
                    # quit()
                        # print("".join(poem))
                        #poem_str = "".join(poem).strip()
                        #if poem_str:
                         #   with open(os.path.join(dir, title.split('/')[0]) + '.txt', "w") as f:
                          #      f.write(poem_str)
