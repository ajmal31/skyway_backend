import paymentRoutes from "../Routes/paymentRoutes.js"

const routesConfig=(app,express)=>{
   
     app.use('/api/payment-srv',paymentRoutes(express))

}

export default routesConfig