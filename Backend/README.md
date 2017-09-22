# Sentinel backend

# Dependencies

Running the 7 nodes network depends on the use of Docker and docker-compose.
Check that these are installed on your system

```
$ docker --version         // Docker version 17.06.0-ce, build 02c1d87
$ docker-compose --version // docker-compose version 1.14.0, build c7bdf9e
```

## Build the Docker image

This usually takes about 5-10 min (with a stable internet connection)
```
$ npm run build
```

Install the dependencies for the node server and start the network + server
```
$ npm install
$ npm start
```
