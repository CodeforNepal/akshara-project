#
# akshara-elasticsearch.dockerfile
#
# Custom elasticsearch image for akshara use
#
# Example build:
#   sudo docker build --tag akshara/elasticsearch:6.2.3 --build-arg es_version=6.2.3 .

# pass the es version as an arg during docker build
ARG es_version

FROM docker.elastic.co/elasticsearch/elasticsearch:${es_version}

# required for the akshara_latin_transliterate analyzer (for searches in latin transliteration)
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu
