# Akshara Elasticsearch

We use [elasticsearch](https://en.wikipedia.org/wiki/Elasticsearch) to provide full-text search capabilities for the documents that are in our system.

This folder houses all the custom elasticsearch setup/configuration we do.


## Features

* Basic search for language texts in their native scripts
* Filtering for language-specific [stop words](https://en.wikipedia.org/wiki/Stop_words) during search
* Search text in native scripts using their latin-transliterated equivalents

Supported languages and scripts:

* [Nepali](https://en.wikipedia.org/wiki/Nepali_language) ([Devanagari](https://en.wikipedia.org/wiki/Devanagari))

Currently, the configuration is optimized for single node cluster, and has sane defaults for the indices.


## Usage

#### Setup

To provision a cluster with the core elasticsearch setup here, run `docker-compose up` from the project root.

After the cluster is up, run the setup script:

```
elasticsearch/setup_akshara_cluster.sh
```

This ensures that all the features listed above are available in the cluster.

#### Indexing

Things to follow when indexing documents into the cluster:

* Use indices of pattern _akshara\_\<language\>*_. Eg: for Nepali docs, use index name that matches the pattern _akshara_nepali*_.
* Set the [*type*](https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html) of the documents to `_doc`.
* Set the *pipeline* param to `akshara_pipeline` (processes docs during ingestion for some useful enrichment).
* Document should have fields defined in the [index template](scripts/set_nepali_template.sh).

For an actual usage example, see the script [test/index_akshara.sh](test/index_akshara.sh). The script populates the cluster with some sample documents.

```
test/index_akshara.sh test/sample_docs/*.json
```

#### Querying

* Query for documents using a language specific index pattern. Eg: `akshara_nepali*` for Nepali docs.
* If you want to query over all indices, use `akshara*`.

For some example queries, see the script [test/test_queries.sh](test/test_queries.sh).

#### Monitoring

To monitor cluster status/performance, you can use Kibana's [monitoring UI](http://localhost:5601/app/monitoring) (note: this is not available when using the [kibana-oss](../.env) image).

Also look into elasticsearch's [cat api](https://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html).


## Useful Commands

These are meant to be run from the project root.

```
# start only the elasticsearch service
docker-compose up elasticsearch

# force a build for our custom image. useful if we modify the image in any way
# docker compose does not rebuild the image if it already exists
docker-compose up --build elasticsearch

# remove the elasticsearch data volume (reset all the indices)
docker-compose down --volumes

# inspect the elasticsearch container
docker exec -it akshara_elasticsearch bash
```


## TODO

* Add all of the decided fields to the Nepali index mapping
* Improved [stemming](https://en.wikipedia.org/wiki/Stemming) for Nepali Devanagari search (currently based on the Hindi stemmer)
* Support fuzzy transliterated searches for Nepali

* Implement size based sharding for akshara indices
* Improve the container logging setup
