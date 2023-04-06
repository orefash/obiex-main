
> ### Obiex Assessment
This is my attempt at the 'UpdateTransactions' microservice for the Backend Developer role application at Obiex. It was built with Nestjs, Express, Docker, and PostgreSQL.
For this project I assumed the following;
- The logger, message queue, and event bus wouldn't be implemented for this phase
- A module within the application called `crypto-api` mocks the 3rd party Crypto API to return the transaction updates
- A Post Request was created to 'UpdateTransactions' in place of a message
- Demo Clients were created with demo wallet details. These clients can be used to test the application. 
- Any other clientID, invalid wallet currency or invallid wallet address will result in unsuccessful requests 
```bash
Demo Clients Info
[
    {
        clientId: 'c1',
        wallets: [
            {
                currency: 'BTC',
                address: 'myueAFjQTdnmxkoM4QbuAym28BhTGQ3usq'
            },
            {
                currency: 'BNB',
                address: 'n4o5ciu8ceQ6i9hgFgTSeeXzP5ZdifttNN'
            }
        ]
    },
    {
        clientId: 'c2',
        wallets: [
            {
                currency: 'BTC',
                address: 'mnNiUykkHH7nwQrGgQiSdVt6fpXNpf2L1K'
            }
        ]
    }
]
```

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