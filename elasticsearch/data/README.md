Source documents for our elasticsearch instance. Currently includes results from crawling various websites.

A document here is a json file that follows the schema laid out in our elasticsearch [templates](../scripts/set_nepali_template.sh).

TODO keep the document files in a separate repo -- they are here now for convenience.

## Indexing

This assumes that the akshara elaticsearch instance is already up and running -- for more details on that, please refer to the main [README](../README.md).

The commands here are meant to be run from the same host as our elasticsearch instance.

```
# prep the cluster, if not done already (this is safe to run anytime)
../setup_akshara_cluster.sh

# drop the current index, if needed (eg: on mapping changes or new field additions)
# all docs are written to akshara_nepali index right now
curl -XDELETE "${HOSTNAME}:9200/akshara_nepali"

# index all the documents in a given folder
./indexer.sh crawled

# basic stats on the indices
curl "${HOSTNAME}:9200/_cat/indices?v"
```
