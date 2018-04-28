#!/bin/bash
#
# set_nepali_template.sh
#
# set the template mapping for akshara nepali indices

# prefix with akshara, so that we can query for all our indices with akshara*
INDEX_PATTERN="akshara_nepali*"

# Relative from the elasticsearch config folder (eg: /etc/elasticsearch)
#STOPWORDS_FILE="stopwords/nepali_test.txt"
STOPWORDS_FILE="stopwords/nepali.txt"

# useful if we make this a cron job (should actually run only from one of the nodes only. here we pick the current master)
#if ! { curl --silent "${HOSTNAME}:9200/_cat/nodes" | grep '\*' | grep --quiet --ignore-case "$HOSTNAME"; }
#then
#  exit 0
#fi

curl -XPUT "${HOSTNAME}:9200/_template/nepali_template" --header "Content-Type: application/json" --data '{
  "index_patterns": ["'"$INDEX_PATTERN"'"],
  "order": 1,
  "settings": {
    "index": {
      "analysis": {
        "analyzer": {
          "akshara_nepali": {
            "tokenizer": "standard",
            "filter": [
              "lowercase",
              "indic_normalization",
              "nepali_stop",
              /* "nepali_keywords", */
              "nepali_stemmer_derived"
            ]
          },
          "akshara_nepali_standard": {
            "type": "standard",
            "stopwords_path": "'"$STOPWORDS_FILE"'"
            /* "stopwords": ["छ","यही", "होइन"] */
          },
          "akshara_latin_transliterate": {
            "tokenizer": "standard",
            "filter": [
              "latin_transform"
            ]
          }
        },
        "filter": {
          "nepali_stop": {
            "type": "stop",
            "stopwords_path": "'"$STOPWORDS_FILE"'"
            /* "stopwords": ["छ","यही", "होइन"] */
          },
          /* words that should be excluded from stemming */
          "nepali_keywords": {
            "type": "keyword_marker",
            "keywords": ["उदाहरण"]
          },
          /* stemmer based on Hindi */
          /* TODO need a proper stemmer for Nepali */
          "nepali_stemmer_derived": {
            "type": "stemmer",
            "language": "hindi"
          },
          "latin_transform": {
            "type": "icu_transform",
            "id": "Any-Latin; NFD; [:Nonspacing Mark:] Remove; NFC"
          }
        }
      }
    }
  },
  "mappings": {
    "_doc": {
      /*
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
      */
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
          "analyzer": "akshara_nepali",
          "fields": {
            "latin": {
              "type": "text",
              "analyzer": "akshara_latin_transliterate"
            }
          }
        },
        "text": {
          "type": "text",
          "analyzer": "akshara_nepali",
          "fields": {
            "latin": {
              "type": "text",
              "analyzer": "akshara_latin_transliterate"
            }
          }
        }
      }
    }
  }
}'
