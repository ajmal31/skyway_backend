const documentUploading=async(dbRepository,fileLinks,uid)=>{

    let documents={
        "govId":fileLinks[0],
        "aadhar":fileLinks[1],
        "pancard":fileLinks[2],
        "passport":fileLinks[3]
    }
   let response=await dbRepository.documentUploading(documents,uid)
   return response
}

export default documentUploading