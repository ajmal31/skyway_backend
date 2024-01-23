
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import env from "../config/env.js";
import {v4} from "uuid"

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESSKEY,
    secretAccessKey: env.AWS_SECRETKEY,
  },
  region: "eu-north-1",
});


export const uploadFile = async (files,bucketName,folderName) => {

  try {
    const result = files.map(async (file) => {

      const key = `${folderName}/${v4()}`
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key, 
        Body: file?.buffer,
        ContentType: file.mimetype,
      }); 

      //Adding to S3 Bucket
      const response = await s3.send(command);
     
      const url = `https://s3.eu-north-1.amazonaws.com/${bucketName}/${key}`;
      return url; // Return the response from S3

    })
    const urls=Promise.all(result)
    return urls
  } catch (err) {
    console.error("Error found while uploading to S3:", err);
    return { err }; // Return error object if upload fails
  }

};
