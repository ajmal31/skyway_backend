const userServiceInterface=(service)=>{

   const passwordHashing=(password)=>service.passwordHash(password)

   return{
     passwordHashing
   }


}

export default userServiceInterface