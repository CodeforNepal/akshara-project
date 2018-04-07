#!/bin/bash

curl -XGET "${HOSTNAME}:9200/nepali/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "latin",
  "text": "मेरो चोक"
}
'
