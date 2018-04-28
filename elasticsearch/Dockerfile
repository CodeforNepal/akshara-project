# Custom elasticsearch image for akshara use
#
# Example build:
#   sudo docker build --tag akshara/elasticsearch:6.2.4 --build-arg es_version=6.2.4 .

# defaults. pass these as args during docker build to override
ARG es_image=elasticsearch
ARG es_version=6.2.4

# based on official image from elastic
FROM docker.elastic.co/elasticsearch/${es_image}:${es_version}

# Add metadata.
LABEL \
  name="Akshara Elasticsearch Image" \
  # TODO add a dedicated email
  maintainer="Akshara Team <akshara-development-list@googlegroups.com>" \
  vendor="Akshara"

# required for the akshara_latin_transliterate analyzer (for searches in latin transliteration)
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu
