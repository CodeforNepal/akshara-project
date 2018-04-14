#!/bin/bash

#TEXT="मेरो चोक"
#TEXT="मैले नजन्माएको छोरो"
#TEXT="मेरो घर मूल सडकको छेवैमा छ"
TEXT="मेरो यो झ्यालसँग धेरै घनिष्टता बढ्यो"

echo "Based on standard analyzer..."

curl -XGET "${HOSTNAME}:9200/nepali/_analyze?pretty" --header "Content-Type: application/json" --data '{
  "analyzer": "akshara_nepali_standard",
  "text": "'"$TEXT"'"
}'

echo ""
echo "With hindi stemmer..."

curl -XGET "${HOSTNAME}:9200/nepali/_analyze?pretty" --header "Content-Type: application/json" --data '{
  "analyzer": "akshara_nepali",
  "text": "'"$TEXT"'"
}'
