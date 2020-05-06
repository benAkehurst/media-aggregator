# Media Aggregator Server

## Components/Packages Used/Prerequisites

- [Cloudinary Account](https://cloudinary.com/)

## Server Architecture

- Controllers - deal with database read/write operations
- Models - define schemas of objects in the database
- Routes - define the API routing for controller functions
- Scrapers - define a single website scraping method

### Installing & config

1. Clone repo and run `npm i` to install all packages

2. In the `server.js` file, you can modify the database location and name on line 22

### Running the project

3. Add a `.env` flie to the rooen first cloning this project for storing environment variables

- In your .env file you will need:

```.env
CLOUD_NAME=<Cloudinary cloudname>
API_KEY=<Cloudinary api key>
API_SECRET=<Cloudinary api-secret>
```

4. Add a `config.js` to the `middlewares` file and add your own secret phrase

```javascript
module.exports = {
  secret: 'worldisfullofdevelopers',
};
```

5. Start the server with nodemon: `nodemon start server.js`

6. Restart running server by typing: `rs`

## Current Routes

```json
/api/reader/single-day
POST
data : {
  "date":"02/05/2020"
}
```

```json
/api/reader/single-news-source/
POST
data : {
  "date":"02/05/2020",
  "newsSite": "bbc"
}
```

```json
/api/reader/:clippingId
GET
clippingId - MongoDB object ID
```
