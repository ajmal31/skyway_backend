import express, { Express } from "express"
import env from "./src/config/env"
import ExpressConfig from "./src/config/expressConfig";
import RoutesConfig from "./src/config/RoutesConfig";
import connection from "./src/config/db/connection";
import server from "./src/config/server";
import consumer from "./src/Message-Broker/consumer/consumer";

//Create Express Instance
const app: Express = express()

//Invking Express configuration function
ExpressConfig(app)

//Invoking Routes Config
RoutesConfig(app,express)

//Invokign Database configuration function
connection(env.MONGO_URI)

//server
server(app,env.PORT)

//RabbitMQ consumer
consumer()







