import express from "express"
import cors from"cors"
import helmet from "helmet"
import xXssProtection from "x-xss-protection"

const expressConfig=(app)=>{

    //Accept Json Data 
    app.use(express.json())

    //For communicate diffrent servers
    app.use(cors({origin:"*"}))

    //Protect HTTP Headers
    app.use(helmet())
   
    //Preventing Script Injecting Attacks
    app.use(xXssProtection())

    //Convert encrypted data to orginal Form
    app.use(express.urlencoded({extended:true}))


}
export default expressConfig