<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

> ### Obiex Assessment
This is my attempt at the 'UpdateTransactions' microservice for the Backend Developer role application at Obiex. It was built with Nestjs, Express, Docker, and PostgreSQL.

# Getting started

To get the Application running locally:

- [Install Docker Compose](https://docs.docker.com/compose/install/)
- Clone this repository
- cd into the `transaction-service` folder
- Copy the `.env.example` file over to your own `.env` file and update the variables
- Run `docker-compose up -d` to setup local environment with Docker

This setup will handle hot reloading, so any updates you make to the NestJS code will update the container in realtime.

### Tweaking the Dockerfile

If you make any tweaks to the Dockerfile to edit the image, you'll need to run `docker-compose up -d --build` to rebuild the image

## API Documentation

The Postman JSON link can be found [here](https://elements.getpostman.com/redirect?entityId=20674887-e0b41498-7e05-41b9-8b52-d1dd1355608f&entityType=collection). It contains sample requests and responses. You can fork the collection via the link or import the `Transaction Service.postman_collection.json` file in the `transaction-service` folder.

Replace `{{tservice_url}}` with your app url e.g `localhost:4500` to test the endpoints in Postman.