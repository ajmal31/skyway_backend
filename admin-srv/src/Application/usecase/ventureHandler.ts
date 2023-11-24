const ventureHandler = async(dbRepo: any, data: Record<string, any>) => {
    console.log('venture handler working')
     
    console.log('venture handler data recived ',data)

    const response=await dbRepo.ventureDataHandler(data)


}

export default ventureHandler