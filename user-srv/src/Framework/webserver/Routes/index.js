//import router file here
import useRoutes from "./user/userRoutes.js"

const Routes=(app,express)=>{

    console.log('reach in router')
    app.use('/api/user-srv',useRoutes(express))
}

export default Routes