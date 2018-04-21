# Custom elasticsearch image for akshara use
#
# Example build:
#   sudo docker build --tag akshara/elasticsearch:6.2.3 --build-arg es_version=6.2.3 .

# pass the es version as an arg during docker build
ARG es_version

# based on official image from elastic
FROM docker.elastic.co/elasticsearch/elasticsearch:${es_version}

# Add metadata.
LABEL \
  name="Akshara Elasticsearch Image" \
  # TODO add a dedicated email
  maintainer="Akshara Team <akshara-development-list@googlegroups.com>" \
  vendor="Akshara"

# required for the akshara_latin_transliterate analyzer (for searches in latin transliteration)
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu
