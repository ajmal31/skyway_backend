import { paymentHistory } from "../model/transactionSchema.js"
const paymentHelper=()=>{


    
    const saveTransaction=async(userId,ventureId,amount)=>{

     
        const transaction=new paymentHistory({

            userId:userId,
            ventureId:ventureId,
            amount:amount
        })
        const response=await transaction.save()
        return response

    }

    return{
        saveTransaction
    }

}

export default paymentHelper