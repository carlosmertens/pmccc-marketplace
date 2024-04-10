# MPCCC MARKETPLACE API

## ROUTES

/api/v1/tests

/api/v1/books

/api/v1/video-games

/api/v1/parts

/apit/v1/tours

/api/v1/users

## ROUTES RESOURCES

/api/v1/[RouteName]/[id]

/api/v1/tours/?difficulty=[easy | medium | hard]

api/v1/tours/?duration[gte | gt | lte | lt]=[number of hours]

api/v1/tours/sort=[property key]

api/v1/users/?sort=date

## DEPENDENCIES

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "debug": "^4.3.4",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.3.0",
    "nodemon": "^3.1.0",
    "bcrypt": "^5.1.1"
  }
}
```

## AUTHORS

- **Claudia Duque** - _Full Stack Developer_
- **Maximilian Autrum** - _Full Stack Developer_
- **PieterDCI** - _Full Stack Developer_
- **Christopher Kuhn** - _Full Stack Developer_
- **Carlos Mertens** - _Full Stack Developer_
