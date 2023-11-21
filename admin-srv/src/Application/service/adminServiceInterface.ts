const adminServiceInterface=(services:any)=>{

    const tokenGenerate=(data:Record<string,any>)=>services.tokenGenerate(data)

    return{

        tokenGenerate
    }


}

export default adminServiceInterface