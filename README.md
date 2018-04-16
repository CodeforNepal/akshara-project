# akshara-project

Akshara is an initiative to promote the usage of native langauge in computing and literature.

## Docker Usage

We use docker during development as well as for production use.

Please follow the official docs to install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) on your system.

Then a simple `docker-compose up` (from the project root directory) will start all of the akshara services. Full list of those services:

* Elasticsearch, for the search backend (http://localhost:9200)
* Kibana, for exploring the elasticsearch data (http://localhost:5601)

#### Notes

* You will need to prefix the docker commands with *sudo*, if you haven't added your user to the *docker* group.

* If you are a developer running the elasticsearch instance here for testing, please read through the elasticsearch-specific [akshara docs](elasticsearch/README.md), especailly the [usage](elasticsearch/README.md#usage) section. Our elasticsearch setup makes certain assumptions that you need to follow while indexing documents, to ensure that all search features are available.
