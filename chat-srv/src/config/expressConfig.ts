import express, { Express } from "express"
import cors from "cors"
import helmet from "helmet"
import xXssProtection from "x-xss-protection"
import morgan from "morgan"

const ExpressConfig = (app: Express) => {

    //Accept Json Data 
    app.use(express.json())
    app.set("trust proxy", true)
    //For communicate diffrent servers
    app.use(cors({ origin: "*" }))

    //Protect HTTP Headers
    app.use(helmet())

    //Preventing Script Injecting Attacks
    app.use(xXssProtection())

    //Convert encrypted data to orginal Form
    app.use(express.urlencoded({ extended: true }))

    //monitor Perfomance and Security also better for debugging
    app.use(morgan('dev'))



}
export default ExpressConfig