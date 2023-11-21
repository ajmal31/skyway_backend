const ventureHandler = async(dbRepo: any, data: Record<string, any>) => {
    

    const response=await dbRepo.ventureDataHandler(data)


}

export default ventureHandler