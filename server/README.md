# Media Aggregator Server

## Components/Packages Used/Prerequisites

- [Cloudinary Account](https://cloudinary.com/)
- [MongoDB Atlas Account](https://cloud.mongodb.com/)
- Node v18+

## Server Architecture

- Controllers - deal with database read/write operations
- Models - define schemas of objects in the database
- Routes - define the API routing for controller functions
- Scrapers - define a single website scraping methods

### Installing & config

1. Clone repo and run `npm i` to install all packages

### Running the project

1. Add a `.env` file to the root of the server and copy the env variables from the `.env.delete` and delete the example file

2. Run `npm run dev` to get the dev build working with hot refresh using Nodemon

## Routes

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
