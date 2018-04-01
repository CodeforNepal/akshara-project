#!/bin/bash
#
# set_nepali_template.sh
#
# set the template mapping for nepali indices

# useful if we make this a cron job (should actually run only from one of the nodes only. here we pick the current master)
if ! { curl --silent "$HOSTNAME:9200/_cat/nodes" | grep '\*' | grep --quiet --ignore-case "$HOSTNAME"; }
then
  exit 0
fi

curl --silent -XPUT "$HOSTNAME:9200/_template/nepali_template" --header "Content-Type: application/json" --data '{
    "template": "nepali*",
    "order": 1,
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
                "post_date": {
                    "type": "date",
                    "format": "epoch_second"
                },
                "author": {
                    "type": "keyword",
                    "norms": false
                },
                "title": {
                    "type": "text"
                },
                "text": {
                    "type": "text"
                }
            }
        }
    }
}'
