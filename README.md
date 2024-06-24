# PMCCC MARKETPLACE API

API connecting PMCCC MongoDB database with website and a mobile app in the future.

Developed using modern technologies such as [MongoDB](https://www.mongodb.com/), [Express JS](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [JSON Web Token](https://jwt.io/), [Jest](https://jestjs.io/), [Joi validation](https://joi.dev/api/?v=17.13.3), etc...

## TECHNIQUES

- Information Expert Principal and Instance Methods
- Error handlers
- Async wrappers
- Extra validation with Joi validation
- Quering api
- Hashing methods
- Unit and integration tests

## GETTING STARTED

- Clone, fork or download the latest version (Main or v2 branches)
- Request .env file or values to create your own:

```.env
PORT=8000
DEBUG=dev:*
COMPASS_URI=mongodb://localhost:27017/
ATLAS_URI=''
DB_NAME=mpccc
DB_NAME_TEST=mpccc_test
JWT_SECRET_KEY=
ADMIN_PIN=
```

- Run in the terminal:

For development use

```bash
npm run dev
```

Or development with jest test

```bash
npm test
```

## ROUTES

/api/v2/tests

/api/v2/books

/api/v2/video-games

/api/v2/parts

/api/v2/tours

/api/v2/users

/api/v2/orders

## ROUTES RESOURCES

/api/v1/[RouteName]/[id]

/api/v1/tours/?difficulty=[easy | medium | hard]

api/v1/tours/?duration[gte | gt | lte | lt]=[number of hours]

api/v1/tours/sort=[property key]

api/v1/users/?sort=date

## DEPENDENCIES

```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "debug": "^4.3.4",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "joi": "^17.13.0",
    "jsonwebtoken": "^9.0.2",
    "lodash": "^4.17.21",
    "mongodb": "^6.5.0",
    "mongoose": "^8.3.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.1.0",
    "supertest": "^7.0.0"
  }
```

## AUTHORS

- **PieterDCI** - _Full Stack Developer_
- **Maximilian Autrum** - _Full Stack Developer_
- **Claudia Duque** - _Full Stack Developer_
- **Christopher Kuhn** - _Full Stack Developer_
- **Carlos Mertens** - _Full Stack Developer_
