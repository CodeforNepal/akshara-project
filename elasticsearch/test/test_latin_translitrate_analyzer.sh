#!/bin/bash

#TEXT="मेरो चोक"
#TEXT="मैले नजन्माएको छोरो"
TEXT="मेरो घर मूल सडकको छेवैमा छ"

curl -XGET "${HOSTNAME}:9200/nepali/_analyze?pretty" --header "Content-Type: application/json" --data '{
  "analyzer": "akshara_latin_transliterate",
  "text": "'"$TEXT"'"
}'
