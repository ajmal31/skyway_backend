import express from "express"
import http from "http"
import expressConfig from "./src/Framework/webserver/express.js"
import serverConfig from "./src/Framework/webserver/server.js"
import config from "./src/config/config.js"
import Routes from "./src/Framework/webserver/Routes/index.js"
import connection from "./src/Framework/database/connection.js"


//create instance of Express
const app=express()

//create instance of the Server
const server=http.createServer(app)

//start Server
serverConfig(server,config).startServer()

//connect db 
connection(config)

//invoking express configurationn
expressConfig(app,express)

//invoking Routes configuration
Routes(app,express)













