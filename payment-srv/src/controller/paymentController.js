import env from "../config/env.js"
import paymentHelper from "../helpers/paymentHelper.js"
import Stripe from "stripe"


const paymentController = async (req, res) => {

   const stripe=new Stripe(env.STRIPE_SECRET_KEY)

   


  const session=await stripe.checkout.sessions.create({

    payment_method_types:["card"],
    line_items:[{
        price_data:{
            currency:"inr",
            product_data:{
                name:'service',
            },
            unit_amount:1000,
        },
        quantity:1
    }],
    mode:'payment',
    success_url:"http://localhost:5173/profile",
    cancel_url:"http://localhost:5173/profile"

  })
   
  return res.json({sessionId:session.id})

}
export default paymentController