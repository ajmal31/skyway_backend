const userServiceInterface=(service)=>{

   const passwordHashing=(password)=>service.passwordHash(password)
   const verifyPassword=(dbPassword,password)=>service.verifyPassword(dbPassword,password)

   return{
    verifyPassword,
     passwordHashing
   }


}

export default userServiceInterface