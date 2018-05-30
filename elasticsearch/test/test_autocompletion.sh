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

curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "_source": "title.suggest",
  "suggest": {
    "title-suggest" : {
      "prefix": "'"$TEXT"'",
      "completion": {
        "field": "title.suggest",
        "size": 5
      }
    }
  }
}'
