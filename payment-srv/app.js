import express from "express"
import env from "./src/config/env.js"
import expressConfig from "./src/config/expressConfig.js";
import routesConfig from "./src/config/routesConfig.js";
import dbConnection from "./src/config/db/dbConnection.js";
import server from "./src/config/server.js";
import http from "http"


//Create Express Instance
const app = express()

const httpServer=http.createServer(app)

//Invking Express configuration function
expressConfig(app)

//Invoking Routes Config
routesConfig(app,express)

// //Invokign Database configuration function
dbConnection(env.MONGO_URI)

// //server
server(httpServer,env.APPLICATION_PORT)

