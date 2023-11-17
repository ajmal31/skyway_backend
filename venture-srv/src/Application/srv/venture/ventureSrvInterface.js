const ventureServiceInterface = (service) => {

   const passwordHash = (password_one, password_two) => service.passwordHash(password_one, password_two)
   const verifyPassword = (dbpass_one, pass_one, dbpass_two, pass_two) => service.verifyPassword(dbpass_one, pass_one, dbpass_two, pass_two)
   const generateToken = (uid, ventureName) => service.generateToken(uid, ventureName)


   return {
      generateToken,
      verifyPassword,
      passwordHash
   }

}

export default ventureServiceInterface