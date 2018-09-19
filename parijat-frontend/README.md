# Sangraha Frontend

Sangraha frontend is a single page application created using Preact. Preact is a lightwright React alternative. 

## Development Instructions

### Pre-requisites

Node.js is required to develop the frontend. To install Node.js and npm (Node Package Manager) either follow the [official instructions](https://nodejs.org/en/) or [use nvm](https://github.com/creationix/nvm). 

#### Using nvm

Install `nvm` following the instructions here [nvm installation](https://github.com/creationix/nvm).

Then install the stable version of `node` and `npm`. At the time when this was written the `LTS` version for Node was `8.12.0`.

```bash
nvm install 8.12.0
```

### Install Dependencies

Head to the directory where this README.md file is located and install all development dependencies using npm:

```bash
npm install
```

This downloads all the dependencies locally in `node_modules` directory.


### Start Development Server

Start the development server using the following command:

```bash
npm run dev
```

This will start local development server at `localhost:8080` . The development server has hot-reloading enabled and any changes reflect in the browser once the files are saved.


### Build for production

To build the application for deployment (minified static files), use the following:

```bash
npm run build
```

### Start Production Server

```bash
npm run serve
```

## Preact-CLI

The frontend was bootstrapped using Preact-CLI. For further instructions, and detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
