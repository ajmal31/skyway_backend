const userServiceInterface=(service)=>{

   const passwordHashing=(password)=>service.passwordHash(password)
   const verifyPassword=(dbPassword,password)=>service.verifyPassword(dbPassword,password)
   const generateToken=(_id,username)=>service.generateToken(_id,username)

   return{
    generateToken,
    verifyPassword,
     passwordHashing
   }


}

export default userServiceInterface