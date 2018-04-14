import elasticsearch
from os import walk
from os import path
from datetime import datetime

es = elasticsearch.Elasticsearch(['127.0.0.1'], port=9200)

for (dirpath, dirnames, filenames) in walk("data"):
    for filename in filenames:
        author = path.basename(dirpath)
        # print(":".join([author, filename]))
        with open(path.join(dirpath,filename), 'r') as content_file:
            content = content_file.read()
            es.index(index='nepali', doc_type='poem', body={
                'author': author,
                'title': path.splitext(filename)[0],
                'content': content
            })
