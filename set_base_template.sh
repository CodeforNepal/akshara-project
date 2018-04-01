#!/bin/bash
#
# set_base_template.sh
#
# Default settings for all indices in the cluster

# useful if we make this a cron job (should actually run only from one of the nodes only. here we pick the current master)
if ! { curl --silent "$HOSTNAME:9200/_cat/nodes" | grep '\*' | grep --quiet --ignore-case "$HOSTNAME"; }
then
  exit 0
fi

curl --silent -XPUT "$HOSTNAME:9200/_template/base_template" --header "Content-Type: application/json" --data '{
    "template": "*",
    "order": 0,
    "settings": {
        "index.codec": "best_compression",
        /* enable in prod for some performance gains */
        /* "refresh_interval": "10s", */
        "index.number_of_shards": 4,
        /* for testng */
        "index.number_of_replicas": 0,
        "index.search.slowlog.threshold.query.warn": "10s",
        "index.search.slowlog.threshold.query.info": "7s",
        "index.search.slowlog.threshold.query.debug": "5s",
        "index.search.slowlog.threshold.query.trace": "1s",
        "index.search.slowlog.threshold.fetch.warn": "1s",
        "index.search.slowlog.threshold.fetch.info": "800ms",
        "index.search.slowlog.threshold.fetch.debug": "500ms",
        "index.search.slowlog.threshold.fetch.trace": "200ms",
        "index.search.slowlog.level": "info",
        "index.indexing.slowlog.threshold.index.warn": "10s",
        "index.indexing.slowlog.threshold.index.info": "5s",
        "index.indexing.slowlog.threshold.index.debug": "2s",
        "index.indexing.slowlog.threshold.index.trace": "500ms",
        "index.indexing.slowlog.level": "info",
        "index.indexing.slowlog.source": "1000"
    }
}'
