#!/bin/bash

#TEXT="मेरो चोक"
#TEXT="मैले नजन्माएको छोरो"
TEXT="मेरो घर मूल सडकको छेवैमा छ"

curl -XGET "${HOSTNAME}:9200/nepali/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "latin",
  "text": "'"$TEXT"'"
}
'
