import elasticsearch
from os import walk
from os import path
from datetime import datetime

es = elasticsearch.Elasticsearch(['35.188.165.211'], port=9200)

for (dirpath, dirnames, filenames) in walk("data"):
    for filename in filenames:
        author = path.basename(dirpath)
        # print(":".join([author, filename]))
        with open(path.join(dirpath,filename), 'r') as content_file:
            content = content_file.read()
            if not content:
                continue
            es.index(index='akshara_nepali_kavita', doc_type='_doc', body={
                'author': author,
                'title': path.splitext(filename)[0],
                'content': content
            })

# index = 'akshara_nepali_sahitya'
#
# es.indices.delete(index = index)
# es.indices.create(index = index)
# mapping = '''
#         {
#             "properties":{
#                 "author_date":{
#                     "type":"date",
#                     "format":"MMMM dd, yyyy"
#                 }
#             }
#         }
#     '''
# es.indices.put_mapping(index=index, doc_type='_doc', body=mapping)
#
# for (dirpath, dirnames, filenames) in walk("sangraha-data"):
#     for filename in filenames:
#         with open(path.join(dirpath, filename), 'r') as content_file:
#             content = content_file.read()
#             es.index(index= index, doc_type='_doc', body=content)
