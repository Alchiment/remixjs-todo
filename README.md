# Project laboratory remixjs-todo

# General information

## Run server
Express server will start on port ```7000``` and GraphQL Server will be available on port ```{server}:7000/graphql```
```
npm run start
```

## Run MongoDB base on Docker
Server is using MongoDB, so you need to run MongoDB on your local machine through Docker or just use a Docker connection. 

The Docker URL connection is assigned in ```src/utils/database.js``` file through environment variables and is named as
URL_DB. So that means you can configure that variable in the .env file.

It's recommended to store the MongoDB data in a volume. Below you can find an example command to run MongoDB on Docker in a Windows environment.
```
docker run -p 27017:27017 -d --name remixjs-laboratory-mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -v D:/www-store/mongodb:/data/db mongo
```
URL_DB environment variable should be:

```URL_DB=mongodb://root:secret@localhost:27017/```

## .env file
Replace values with << TEXT >> with your own values.
```
URL_DB=<<MONGO_DB_URL>>
JWT_HASH=<<JWT_TOKEN_HASH>>
DB_NAME=<<DATABASE_NAME>>
```

## Initial data user example
```
{
  "firstName": "Jacinto",
  "lastName": "Armando",
  "email": "test@test.co",
  "identification": "0012345",
  "identification_type": "CC",
  "type": [
    "client"
  ],
  "mobile": "300685746",
  "address": {
    "address": "Avenida siempre viva 123",
    "city": "Cali",
    "department": "Valle del Cauca",
    "country": "Colombia",
    "zipCode": ""
  },
  "password": ""
}
```
To simulate password encryption, you can uncomment the line 8 in ```auth.controller.js``` file and make a request with the password in the body. That endpoint will show you the encrypted password. Once you have the encrypted password, you can use a database manager (as MongoDB Compass) to update the password field in the database.

# Installation project
- Clone repository
- Install dependencies
- Create .env file
- Run docker container with MongoDB
- Create database with the same name as DB_NAME in .env file
- Create a collection named ```users``` in the database
- Run server

