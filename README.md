# T-T_Stalk_Market

You can find the deployed project on [Netlify](https://taterntots-stalk-market.netlify.app/).

## Project Overview

Welcome to The Tater & Tots Community Stalk Market! This is a simple web application that let's my Twitch community keep track of their daily turnip prices in the Nintendo Switch game Animal Crossing: New Horizons. You can enter two prices per day (morning and afternoon) and easily find which island holds the best price for that day to make finding the highest profit easy.

### Key Features

- Onboarding using JWT for authentication
- Viewing and posting daily turnip prices

## Tech Stack

### Front end built using:

- [React](https://reactjs.org/): Current industry standard for web applications, using React let us displaying large amounts of data effectively by implementing Components. It is also very scalable, perfect for large applications with huge growth potential.
- [Redux](https://redux.js.org/): Centralizes our application's state and logic, easy to test/debug, works with any UI layer
- [Chakra](https://chakra-ui.com/): Chakra UI is accessible and themeable component library. Simple to implement and build beautiful looking apps fast.
- [Cypress](https://docs.cypress.io/): Fast, easy and reliable testing for anything that runs in a browser. Amazing UI tool for making setting up, writing, and running tests a breeze and easy to visualize. (Tests yet to be implimented).

#### Front end deployed to [Netlify](https://taterntots-stalk-market.netlify.app/).

### [Back end](https://github.com/taterntots/tnt_stalk_market-be) built using:

- NodeJS
- Express
- Knex
- PostgreSQL
- Cypress (Tests yet to be implimented)

# APIs

## Authentication API

To authenticate a new user, you must send the following to the back end.

Expects:

```json
{
	"villager_name": "yourvillagername",
	"island_name": "yourislandname",
	"password": "password"
}
```

Returns:

```json
{
	"villager_name": "yourvillagername",
	"island_name": "yourislandname",
  "token": "yourtoken"
	"id": 1
}
```

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.
create a .env.local file that includes the following:

\_ REACT_APP - Notates the enviroment for the database.

    *    REACT_APP_databaseURL=https://tnt-stalk-market-be-production.herokuapp.com/api

    *    REACT_APP_NODE_ENV=
       <produciton> OR <development>
       
# Installation Instructions

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm start** to start the local server listening on [localhost:3000](http://localhost:3000)

## Documentation

See [Backend Documentation](https://github.com/taterntots/tnt_stalk_market-be) for details on the backend of our project.
