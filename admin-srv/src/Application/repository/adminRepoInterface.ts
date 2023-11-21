const adminRepInterface=(respositories:any)=>{

  const ventureDataHandler=(data:Record<string,any>)=>respositories.insertVentureData(data)


  return {
    ventureDataHandler
  }
}

export default adminRepInterface