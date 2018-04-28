import elasticsearch
from os import walk
from os import path
from datetime import datetime

es = elasticsearch.Elasticsearch(['172.18.0.3'], port=9200)

# for (dirpath, dirnames, filenames) in walk("data"):
#     for filename in filenames:
#         author = path.basename(dirpath)
#         # print(":".join([author, filename]))
#         with open(path.join(dirpath,filename), 'r') as content_file:
#             content = content_file.read()
#             es.index(index='nepali', doc_type='poem', body={
#                 'author': author,
#                 'title': path.splitext(filename)[0],
#                 'content': content
#             })
es.indices.delete(index ='sangraha2')
es.indices.create(index ='sangraha2')
# mapping = '''
#         {
#             "properties":{
#                 "datetime":{
#                     "type":"date",
#                     "format":"epoch_millis"
#                 }
#             }
#         }
#     '''
# es.indices.put_mapping(index='sangraha2', doc_type='sahitya', body=mapping)

for (dirpath, dirnames, filenames) in walk("sangraha-data"):
    for filename in filenames:
        with open(path.join(dirpath, filename), 'r') as content_file:
            content = content_file.read()
            es.index(index='sangraha2', doc_type='sahitya', body=content)
