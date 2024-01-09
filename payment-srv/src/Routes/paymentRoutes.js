import paymentController from "../controller/paymentController.js"

const paymentRoutes=(express)=>{

    const router=express.Router()
    console.log('helo')
    router.route('/payment-intent').post(paymentController)

    return router

}

export default paymentRoutes