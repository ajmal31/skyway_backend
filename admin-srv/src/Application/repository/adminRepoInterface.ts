const adminRepInterface=(repositories:any)=>{

  const ventureDataHandler=(data:Record<string,any>)=>repositories.insertVentureData(data)
  const login=(data:Record<string,any>)=>repositories.login(data)
  const adminExist=(email:string)=>repositories.findAdmin(email)
  const ventureList=()=>repositories.findAllventures()
  const userHandler=(data:Record<string,any>)=>repositories.insertUserData(data)
  const getWalletAmount=()=>repositories.getWalletAmount()

  


  return {
    getWalletAmount,
    userHandler,
    ventureList,
    adminExist,
    ventureDataHandler,
    login
  }
}

export default adminRepInterface