#!/bin/bash

INDEX="nepali"

ELASTICSEARCH_URL="${HOSTNAME}:9200"
PIPELINE="default_pipeline"

# as unix time
#CURRENT_TIME=$(date +'%s')

DOC='{
  "author": "test author",
  "title": "test title",
  "text": "test text"
}'

curl -XPOST "${ELASTICSEARCH_URL}/${INDEX}/_doc/?pipeline=${PIPELINE}&pretty" \
  --header "Content-Type: application/json" \
  --data "$DOC"
