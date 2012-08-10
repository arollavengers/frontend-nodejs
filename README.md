# Setup

First install all dependencies (dependencies and devDependencies)

    npm install

Launch the tests:

    npm test

Launch the behavior tests:

    npm run-script specs


# Usecase

1. Starts BackEnd

```bash
    cd ../backend-webapp-springmvc/
    mvn jetty:run

    ...
    2012-08-10 21:21:24.646:INFO::Started SelectChannelConnector@0.0.0.0:8081
    [INFO] Started Jetty Server
    [INFO] Starting scanner at interval of 10 seconds.
```

Open a browser on url: `http://localhost:8081/rest/ping/Pacman`

```json
     {"name":"Pacman","timeMillis":1344635057649}
```

2. Starts FrontEnd

```bash
     cd ../frontend-nodejs
     node lib/server.js

     Server started on 8080
```

Open a browser on url: `http://localhost:8080/ping/Pacman`

```json
     {"name":"Pacman","timeMillis":1344635068272}
```

