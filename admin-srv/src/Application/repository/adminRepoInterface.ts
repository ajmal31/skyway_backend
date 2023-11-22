const adminRepInterface=(respositories:any)=>{

  const ventureDataHandler=(data:Record<string,any>)=>respositories.insertVentureData(data)
  const login=(data:Record<string,any>)=>respositories.login(data)
  const adminExist=(email:string)=>respositories.findAdmin(email)
  const ventureList=()=>respositories.findAllventures()
  


  return {
    
    ventureList,
    adminExist,
    ventureDataHandler,
    login
  }
}

export default adminRepInterface