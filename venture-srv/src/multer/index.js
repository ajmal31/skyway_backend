
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import env from '../config/env.js';

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESSKEY,
    secretAccessKey: env.AWS_SECRETKEY,
  },
  region: "us-east-1",
});


export const uploadFile = async (files) => {

  const bucketName = "focuspoint-dev"


  try {
    const result = files.map(async (file) => {

      const key = file.originalname
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key, // Corrected key
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      const response = await s3.send(command);
      const url = `https://focuspoint-dev.s3.amazonaws.com/${key}`;
      return url; // Return the response from S3

    })
    const urls=Promise.all(result)
    return urls
  } catch (err) {
    console.error("Error found while uploading to S3:", err);
    return { err }; // Return error object if upload fails
  }

};
