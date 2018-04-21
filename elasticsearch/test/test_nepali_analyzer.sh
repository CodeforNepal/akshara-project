#!/bin/bash
#
# Test the behaviour of akshara nepali analyzer(s)
# Assumes that the test index is present in the cluster (via index_akshara.sh)
#
# Usage: ./test_nepali_analyzer.sh [TEXT]

if [ -z "$@" ]; then
  #TEXT="मेरो चोक"
  #TEXT="मैले नजन्माएको छोरो"
  #TEXT="मेरो घर मूल सडकको छेवैमा छ"
  TEXT="मेरो यो झ्यालसँग धेरै घनिष्टता बढ्यो"
else
  TEXT="$@"
fi

INDEX="akshara_nepali_test"

echo "Based on standard analyzer..."

curl -XGET "${HOSTNAME}:9200/${INDEX}/_analyze?pretty" --header "Content-Type: application/json" --data '{
  "analyzer": "akshara_nepali_standard",
  "text": "'"$TEXT"'"
}'

echo ""
echo "With hindi stemmer..."

curl -XGET "${HOSTNAME}:9200/${INDEX}/_analyze?pretty" --header "Content-Type: application/json" --data '{
  "analyzer": "akshara_nepali",
  "text": "'"$TEXT"'"
}'
