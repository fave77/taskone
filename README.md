# TASKONE
A todo webapp for creating and managing tasks! 📝

Application Link - http://ec2-43-204-103-180.ap-south-1.compute.amazonaws.com/

## Features
- Users can create profile, logout or delete profile
- Users can create, view, update and delete tasks
- Users can mention the following details while creating/updating tasks
  - Title (max 50 chars)
  - Description (max 300 chars)
  - Due Date
  - Priority - `LOW`, `MEDIUM`, and `HIGH`
  - Status - `INCOMPLETE`, `COMPLETE`, `CANCELLED`
  - Enable Daily Reminder (starting from a particular timestamp)
  - Enable Recurring Tasks by specifying Time, Frequency
- Tasks are segregated into 3 columns based on **Status**
- Tasks are sorted based on `Priority` and time of creation
- Users cannot set **Reminder** for Completed Tasks
- Users cannot edit Cancelled Task except for **Status**

## Installation
#### Prerequisites
- Docker (preferably version >= 25.0.3)
- Docker Compose (preferably version >= v2.24.6)
- Node (preferably version >= v20.14.0)

Please note, the app was tested with the above version and may or may not work for older ones. If you are facing issues, please try after updating!

#### Steps
The following steps are required to run and setup the project in local!
1. Create a `.env` file at the root of the project, and add the following:
```env
CACHE_PORT=6379
CACHE_PASSWORD=<provide-your-own-password>
CACHE_URL=redis://:${CACHE_PASSWORD}@cache-service:${CACHE_PORT}
DB_PORT=27017
APP_DATABASE_URL=mongodb://db-service:${DB_PORT}/taskone
SCHEDULER_DATABASE_URL=mongodb://db-service:${DB_PORT}/agenda
APP_PORT=8080
UI_PORT=3000
PUBLIC_VAPID_KEY=<provide-your-own-public-key>
PRIVATE_VAPID_KEY=<provide-your-own-private-key>
```

2. In order to set `PUBLIC_VAPID_KEY` and `PRIVATE_VAPID_KEY`, you need to generate your own VAPID key pairs:
```bash
# Install web-push libary
npm i web-push -g

# Generate key pairs
web-push generate-vapid-key
```

3. The project can be setup and executed with just the following command:
```bash
npm run build
```

#### Components
The project has 5 components
- nginx-proxy - port 80
- app-service - port 8080
- ui-service - port 3000
- cache-service - port 6379
- db-service - 27017

Make sure, each one has been compiled and running successfully!

**NOTE:** If you have existing applications already running on these ports, please free them before you execute the build command

If you have made it this far without any issues, just head over to your browser, and type `localhost` and you will have your own personal taskone 🎉

#### URLs

- `GET localhost` -> ui-service
- `GET localhost/ping` -> app-service (basic health check)
- `POST loalhost/api` -> app-service (taskone APIs)
- `GET localhost/api-docs` -> app-service (swagger docs)
- `POST localhost/subscribe` -> app-service (push notification)

**NOTE**: You can also replace localhost with 127.0.0.1

## View

#### Login View
<img src="https://raw.githubusercontent.com/fave77/taskone/main/.github/screenshot1.png">

#### Empty Task View
<img src="https://raw.githubusercontent.com/fave77/taskone/main/.github/screenshot2.png">

#### List Task View
<img src="https://raw.githubusercontent.com/fave77/taskone/main/.github/screenshot3.png">

#### Create Task View
<img src="https://raw.githubusercontent.com/fave77/taskone/main/.github/screenshot4.png">

#### Edit Task View
<img src="https://raw.githubusercontent.com/fave77/taskone/main/.github/screenshot5.png">

## Known Issues

Reminder Feature is implemented using Service workers, and for the push notification to work, Chrome requires SSL certification. Hence, this feature is not working as expected when running locally.

However, it has been tested with Safari, and it works 😇

## License

The GNU GPLv3 - [Priyabrata Biswas](https://github.com/fave77).

<div align="center">

  <h3>Happy Coding ☘️</h3>

  [![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
  [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
  [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

</div>
