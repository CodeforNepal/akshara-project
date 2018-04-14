#!/bin/bash
#
# index_akshara.sh
#
# Simple script to index json documents to elasticsearch
#
# Usage: ./index_akshara.sh sample_docs/*.json

# exit the script when a command fails
set -o errexit

# cacth exit status for piped commands
set -o pipefail

if [ $# -eq 0 ]; then
  echo "Please supply files to index"
  exit 1
fi

##############################################################################

INDEX="nepali"

ELASTICSEARCH_URL="${HOSTNAME}:9200"
PIPELINE="akshara_pipeline"

# as unix time
#CURRENT_TIME=$(date +'%s')

# test
#content='{
  #"author": "test author",
  #"title": "test title",
  #"text": "test text"
#}'

##############################################################################

for file in "$@"; do
  echo "Indexing ${file}..."

  content=$(<"$file")
  #echo "$content"

  curl -XPOST "${ELASTICSEARCH_URL}/${INDEX}/_doc/?pipeline=${PIPELINE}&pretty" \
    --header "Content-Type: application/json" \
    --data "$content"

  echo ""
done
