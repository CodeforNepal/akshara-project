![alt text](https://raw.githubusercontent.com/Code4Nepal/akshara-project/master/parijat-frontend/src/assets/logo.png "सङ्ग्रह")

### सङ्ग्रह | [sangraha.org](http://sangraha.org)


<!-- toc -->

- [Introduction](#introduction)
- [Feedbacks and Bug Report](#feedbacks-and-bug-report)
- [Development Notes](#development-notes)
    + [Notes](#notes)
- [Plan](#plan)
- [Mailing List](#mailing-list)
- [About Code for Nepal - Bay Area](#about-code-for-nepal---bay-area)
- [License](#license)

<!-- tocstop -->

## Introduction

सङ्ग्रह is a portal to digitize and archive literary works from Nepal and make them accessible online through a user-friendly searchable interface to readers all around the world.

Recognizing the lack of an easy access to Nepali literary works in the internet, the सङ्ग्रह project started as an initiative to create an online repository that gathers literary works from Nepal in Nepali and other indigenous languages. The aim is to use digital technology to place Nepali literature before the widest possible audience and raise it to a more visible and influential position in Nepali culture. The objectives of सङ्ग्रह project are:

- Digitize literatures of Nepal in Nepali and non-Nepali languages by established as well as emerging writers
- Create a platform where readers and enthusiasts of literature can browse, search and find relevant content with a customized powerful search facility
- Provide tools and resources for students and readers of literature to learn about different literary cultures of Nepal
- Maintain a free content, open source environment where users can edit the available content and upload new content

The सङ्ग्रह website will be equipped with the following features:

- Full text search
- Facility to browse by different categories such as themes, genre, poets, periods, literary movements, languages, region, etc
- Interactive content designed to explore and learn more about the literature and the authors
- Links to related media - audio, video, art, and web resources
- Side-by-side translations of texts in different languages
- A dictionary, especially for materials in non Nepali languages so that they are accessible to all Nepali speakers

## Feedbacks and Bug Report
Please provide feedbacks here - https://goo.gl/forms/XfIMqXmRMp3MMMMh2 . For bug reports create a Github issue here - https://github.com/Code4Nepal/akshara-project/issues


## Development Notes

We use docker during development as well as for production use. If you're only working on front-end components, you do not need to set up docker environment. See the frontend specific docs [parijat-frontend-docs](parijat-frontend/README.md)

Please follow the official docs to install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) on your system.

Then a simple `docker-compose up` (from the project root directory) will start all of the akshara services. Full list of those services:

* Frontend, for the main site (http://localhost:8080)
* Elasticsearch, for the search backend and datastore (http://localhost:9200)
* Kibana, for exploring the elasticsearch data (http://localhost:5601)

There's also a nginx service that acts as a reverse proxy to the core services, and provides access to them over the web:

* Frontend, at http://localhost/
* Elasticsearch, at http://localhost/es/

#### Notes

* You will need to prefix the docker commands with *sudo*, if you haven't added your user to the *docker* group (https://docs.docker.com/install/linux/linux-postinstall/). 

* If you are a developer running the elasticsearch instance here for testing, please read through the elasticsearch-specific [akshara docs](elasticsearch/README.md), especailly the [usage](elasticsearch/README.md#usage) section. Our elasticsearch setup makes certain assumptions that you need to follow while indexing documents, to ensure that all search features are available.


## Plan
- ☑ Phase 1:  Minimal Viable Product (MVP) Implementation
    - ☑ Basic MVP codebase
    - ☑ Major platform decisions
    - ☑ Add first contents - poems in Nepali language
    - ☑ Launch first version at [सङ्ग्रह](http://sangraha.org)

- ☐ Phase 1.5: Bug Fixes and Progressive Enhancement
    - ☐ Bug fixes
    - ☐ Small feature implementations
    - ☐ Adding new Nepali language content to the Index
    - ☐ Increase documentation
  
- ☐ Phase 2: Crowd Sourcing & New Languages
    - ☐ A Wiki style backend to support crowd sourcing of content
    - ☐ New languages - Newari, Maithili, Bhojpuri
    - ☐ Add e-books and OCR the content
    
 - ☐ Phase 2.5: Marketing and Community
     - ☐ Build techical community of contributors
     - ☐ Build community of content contributors and curators 
     - ☐ Market the product for wider adoption

## Mailing List
We use Google Groups to co-ordinate day-to-day operations, planning and development work. If you are interested in being part of the community please consider joining the group - https://groups.google.com/forum/#!forum/akshara-development-list . Click 'Apply for Membership' to join the list.
         
## About Code for Nepal - Bay Area

Code for Nepal's Bay Area Chapter has been active since January 2017 and focuses on creating a warm open community in the bay area and elsewhere for volunteers to collaborate and engage in pushing forward digital technology for Nepal and Nepalese communities around the globe. We try to meet every Wednesday at 7:30 pm PST. Join us by subscribing to our Google Groups - https://groups.google.com/forum/#!forum/akshara-development-list

## License

The code is provided under the Free and Open Source software license [GNU GPL 3.0](LICENSE) . Except where otherwise noted all content is licensed under [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/).

