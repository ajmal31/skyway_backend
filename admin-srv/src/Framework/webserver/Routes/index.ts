import adminRoutes from "./admin/adminRoutes";
import { Express } from "express";

const Routes=(app:Express,express:any)=>{

    app.use('/api/admin-srv/',adminRoutes(express))

    

}

export default Routes