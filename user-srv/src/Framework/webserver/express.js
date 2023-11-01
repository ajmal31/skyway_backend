import express from "express"
import cors from "cors"
import helmet from "helmet"
import xXssProtection from "x-xss-protection"
import morgan from "morgan"

const expressConfig=(app)=>{

    //allow json kind of datas
    app.use(express.json())

    //http request protecting
    app.use(helmet())
    
    //Avoid xss attack like script injecting
    app.use(xXssProtection())
    
    
    app.use(cors())

    //convert encrypted data to orginal form
    app.use(express.urlencoded({extended:true}))

    //monitor Perfomance and Security also better for debugging
    app.use(morgan('dev'))


}

export default expressConfig