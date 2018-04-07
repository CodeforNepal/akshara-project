#!/bin/bash
#
# set_nepali_template.sh
#
# set the template mapping for akshara nepali indices

# useful if we make this a cron job (should actually run only from one of the nodes only. here we pick the current master)
if ! { curl --silent "$HOSTNAME:9200/_cat/nodes" | grep '\*' | grep --quiet --ignore-case "$HOSTNAME"; }
then
  exit 0
fi

curl --silent -XPUT "$HOSTNAME:9200/_template/nepali_template" --header "Content-Type: application/json" --data '{
    "template": "nepali*",
    "order": 1,
    "settings": {
      "index": {
        "analysis": {
          "analyzer": {
            "latin": {
              "tokenizer": "standard",
              "filter": [
                "aksharaLatinTransform"
              ]
            }
          },
          "filter": {
            "aksharaLatinTransform": {
              "type": "icu_transform",
              "id": "Any-Latin; NFD; [:Nonspacing Mark:] Remove; NFC"
            }
          }
        }
      }
    },
    "mappings": {
        "_doc": {
            "dynamic_templates": [{
                "string_template": {
                    "path_match": "*",
                    "mapping": {
                        "type": "keyword",
                        "norms": false,
                        "doc_values": false
                    }
                }
            }],
            "properties": {
                "ingest_time": {
                    "type": "date",
                    "format": "epoch_millis"
                },
                "author": {
                    "type":"text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "norms": false
                        }
                    }
                },
                "title": {
                    "type": "text",
                    "fields": {
                        "latin": {
                            "type": "text",
                            "analyzer": "latin"
                        }
                    }
                },
                "text": {
                    "type": "text"
                }
            }
        }
    }
}'
