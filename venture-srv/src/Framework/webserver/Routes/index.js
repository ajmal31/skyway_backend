//import router file here
import ventureRoutes from "./venture/ventureRoutes.js"

const Routes=(app,express)=>{

    console.log('reach in router')
    app.use('/api/venture-srv',ventureRoutes(express))
}

export default Routes