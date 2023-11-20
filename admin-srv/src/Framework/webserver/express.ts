import express,{Express} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xXssProtection from 'x-xss-protection'
import morgan from 'morgan'


const expressConfig=(app:Express):void=>{

    //Allow Json Format Data's
    app.use(express.json())

    //HTTP Request Protecting 
    app.use(helmet())

    //Avoid Xss Attacks Like Script Injecting
    app.use(xXssProtection())

    //Allow The Communitcation Procegeours with Another Server
    app.use(cors())

    //Convert Encrypted Data to orginal Form
    app.use(express.urlencoded({extended:true}))

    //Monitor Perfomance And security Also Better for Debugging
   app.use(morgan('dev'))

}

export default expressConfig