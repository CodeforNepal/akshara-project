#!/bin/bash
#
# Test the autocompletion feature
# Assumes that the test index is present in the cluster (via index_akshara.sh)
#
# Usage: ./test_autocompletion.sh [TEXT]

if [ -z "$@" ]; then
  TEXT="मेरो"
  #TEXT="मेरा"
  #TEXT="मरो"
  #TEXT="मेरो चोक"
  #TEXT="चोक"
  #
  #TEXT="मैले"
  #TEXT="छोरो"
else
  TEXT="$@"
fi

INDEX="akshara_nepali_test"

# field names
TITLE_FIELD="title"
AUTHOR_FIELD="author"

# https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html#querying
curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "_source": [
    "'"$TITLE_FIELD"'",
    "'"$AUTHOR_FIELD"'"
  ],
  "suggest": {
    "title-suggest" : {
      "prefix": "'"$TEXT"'",
      "completion": {
        "field": "'"$TITLE_FIELD"'.suggest",
        "fuzzy": false,
        "size": 5
      }
    },
    "author-suggest" : {
      "prefix": "'"$TEXT"'",
      "completion": {
        "field": "'"$AUTHOR_FIELD"'.suggest",
        "fuzzy": true,
        "size": 5
      }
    }
  }
}'
