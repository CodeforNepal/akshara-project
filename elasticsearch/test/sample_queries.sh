#!/bin/bash
#
# Some example queries demonstrating the usage of akshara elasticsearch cluster.
# Assumes that the test index is present in the cluster (via index_akshara.sh)
#
# Usage: ./sample_queries.sh

INDEX="akshara_nepali_test"

##############################################################################

echo "Search for a text match across all the fields:"

curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
            "query": "छोरो",
            "analyze_wildcard": true,
            "default_field": "*"
          }
        }
      ]
    }
  }
}'

##############################################################################

echo ""
echo "Search for an exact text match in the title field:"

curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
            "query": "title:\"नजन्माएको छोरो\"",
            "analyze_wildcard": true,
            "default_field": "*"
          }
        }
      ]
    }
  }
}'

##############################################################################

echo ""
echo "Search with a stop word (should only give results for the other word):"

curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
          "query": "text:(चोक छ)",
            "analyze_wildcard": true,
            "default_field": "*"
          }
        }
      ]
    }
  }
}'

##############################################################################

echo ""
echo "Search with latin transliterated text:"

curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
          "query": "title.latin:choro",
            "analyze_wildcard": true,
            "default_field": "*"
          }
        }
      ]
    }
  }
}'

##############################################################################

echo ""
echo "Aggregate by a field (find top authors with most contributions):"

curl -XGET "${HOSTNAME}:9200/${INDEX}/_search?pretty" --header "Content-Type: application/json" --data '{
  "size": 0,
  "aggs": {
    "2": {
      "terms": {
        "field": "author.keyword",
        "size": 10,
        "order": {
          "_count": "desc"
        },
        "missing": "__missing__"
      }
    }
  },
  "query": {
    "bool": {
      "must": [
        {
          "match_all": {}
        }
      ]
    }
  }
}'

##############################################################################
