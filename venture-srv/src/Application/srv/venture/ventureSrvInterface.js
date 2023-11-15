const ventureServiceInterface = (service) => {

   const passwordHash=(password_one,password_two)=>service.passwordHash(password_one,password_two)


   return{
    passwordHash
   }

}

export default ventureServiceInterface