# Items Selection B&N

> The item selection component of the Barnes & Nobles website.\
This is built using the MERN stack.


![alt text](https://github.com/Sweet-Treat/barnesandundignifiedItemSelection/blob/main/gif-fec.gif "Item selection app")



## Related Projects

  - https://github.com/Sweet-Treat/barnesandundignifiedProductAndAuthor
  - https://github.com/Sweet-Treat/barnesandundignifiedAlsoBought
  - https://github.com/Sweet-Treat/barnesandundignifiedreviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
### Database seeding

To seed the database
```sh
npm run db-seed
```
### Bundle file

To create the bundle file
```sh
npm run react-dev
```
### Local server

To run locally, listens on port 3001
```sh
npm run server-dev
```
### Production

To run in production
- Change endpoint in client/dist/src/lib/inventory.js
- Change Mongo URI in db/index.js
- Change endpoints for TitleAndAuthor and Reviews service (may not be required)