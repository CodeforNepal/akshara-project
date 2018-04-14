#!/bin/bash
#
# set_akshara_ingest_pipeline.sh
#
# configures the default akshara ingest pipeline in the cluster

# useful if we make this a cron job (should actually run only from one of the nodes only. here we pick the current master)
if ! { curl --silent "${HOSTNAME}:9200/_cat/nodes" | grep '\*' | grep --quiet --ignore-case "$HOSTNAME"; }
then
  exit 0
fi

curl -XPUT "${HOSTNAME}:9200/_ingest/pipeline/akshara_pipeline" --header "Content-Type: application/json" --data '{
  "description" : "The default ingest pipeline for processing akshara docs",
  "processors" : [
    {
      "script": {
      "lang": "painless",
      "inline": "ctx.ingest_time = new Date().getTime()"
      }
    }
  ]
}'
