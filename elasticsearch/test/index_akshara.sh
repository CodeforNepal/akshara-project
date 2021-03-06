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

ELASTICSEARCH_URL="http://${HOSTNAME}:9200"

#INDEX="akshara_nepali_test" # for testing
INDEX="akshara_nepali"       # prod index name

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

#echo "Deleting index ${INDEX} (if it exists)..."
#curl --silent --show-error --request DELETE "${ELASTICSEARCH_URL}/${INDEX}"
#echo ""

for file in "$@"; do
  echo ""
  echo "Indexing '${file}' to index '${INDEX}'"

  content=$(<"$file")
  #echo "$content"

  curl --silent --show-error --request POST \
    "${ELASTICSEARCH_URL}/${INDEX}/_doc/?pipeline=${PIPELINE}&pretty" \
    --header "Content-Type: application/json" \
    --data "$content"

  echo ""
done
