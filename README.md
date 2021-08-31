# Travel Planning Web App

Web application for travel planning. Shows relevant information about the intended travel destination to the user, such as typical weather conditions, taking into account when the user plans to travel.

This project was created as part of my Udacity studies (via RMIT Australia).

## Installation

The app requires [Node.js](https://nodejs.org/en/) 14.x or greater.

Install NPM dependencies with the following command:

    npm -i

Then perform a production build with the following:

    npm run build-prod

## Usage

Start the server with the following command:

    npm run start


The following API keys are expected to be on provided in the environment (or a .env file):

    GEONAMES_USER=***
    API_KEY=********************************
    API_KEY2=********************************
    Todo: Update with required keys.

The server runs on port 8080, so to view the client open the following url in your browser:

    http://localhost:8080

Using the input fields provided enter the intended travel location and date. Relevant information is displayed upon submission.

## Author

David C. Page (https://davidpageinteractive.com)

## License

This app is distributed under the ISC license.