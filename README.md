# akshara-project

Akshara is an initiative to promote the usage of native langauge in computing and literature.

## Docker Usage

We use docker during development as well as for production use.

Please follow the official docs to install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) on your system.

Then a simple `docker-compose up` (from the project root directory) will start all of the akshara services. Full list of those services:

* Parijat frontend, for the main site (http://localhost:8080)
* Elasticsearch, for the search backend and datastore (http://localhost:9200)
* Kibana, for exploring the elasticsearch data (http://localhost:5601)

There's also a nginx service that acts as a reverse proxy to the core services, and provides access to them over the web:

* Parijat frontend, at http://localhost/
* Elasticsearch, at http://localhost/es/

#### Notes

* You will need to prefix the docker commands with *sudo*, if you haven't added your user to the *docker* group.

* If you are a developer running the elasticsearch instance here for testing, please read through the elasticsearch-specific [akshara docs](elasticsearch/README.md), especailly the [usage](elasticsearch/README.md#usage) section. Our elasticsearch setup makes certain assumptions that you need to follow while indexing documents, to ensure that all search features are available.
