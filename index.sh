#!/bin/bash

ELASTICSEARCH_URL="${HOSTNAME}:9200"
INDEX="nepali"

# as unix time
CURRENT_TIME=$(date +'%s')

DOC='{
  "post_date": "'"$CURRENT_TIME"'",
  "author": "test author",
  "title": "test title",
  "text": "test text"
}'

curl -XPOST "${ELASTICSEARCH_URL}/${INDEX}/_doc/?pretty" \
  --header "Content-Type: application/json" \
  --data "$DOC"
