import jwt from 'jsonwebtoken'
const serviceImplements=()=>{

    const secret_key="ajmal123admin-srv"

   const tokenGenerate=async(data:Record<string,any>)=>{

      const token=await jwt.sign(data,secret_key)
      return token
       
   }

   return{
    tokenGenerate
   }

}

export default serviceImplements