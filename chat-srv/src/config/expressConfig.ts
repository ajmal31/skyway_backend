import express,{Express} from "express"
import cors from"cors"
import helmet from "helmet"
import xXssProtection from "x-xss-protection"

const ExpressConfig=(app:Express)=>{

    //Accept Json Data 
    app.use(express.json())

    //For communicate diffrent servers
    app.use(cors())

    //Protect HTTP Headers
    app.use(helmet())
   
    //Preventing Script Injecting Attacks
    app.use(xXssProtection())

    //Convert encrypted data to orginal Form
    app.use(express.urlencoded({extended:true}))

   

}
export default ExpressConfig