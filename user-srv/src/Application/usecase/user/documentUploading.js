import { uploadFile } from "../../../s3/index.js"
const documentUploading=async(dbRepository,uid,files)=>{

    const bucketName = "skyway.innovative"
    const folderName="user-documents"
    
    const fileLinks=await uploadFile(files,bucketName,folderName)  
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