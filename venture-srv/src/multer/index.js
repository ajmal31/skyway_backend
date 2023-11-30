import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand, GetObjectCommand,S3Client } from "@aws-sdk/client-s3";

import env from '../config/env.js';

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESSKEY,
    secretAccessKey: env.AWS_SECRETKEY,
  },
  region: "us-east-1",
});

const bucketName = "focuspoint-dev"; // Corrected bucket name

// Function for uploading a file to S3
export const uploadS3 = async (file) => {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: "ajmal12365", // Corrected key
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const response = await s3.send(command);
    console.log("After uploading:", response);
    return response; // Return the response from S3
  } catch (err) {
    console.error("Error found while uploading to S3:", err);
    return { err }; // Return error object if upload fails
  }
};

// Function for retrieving a file URL from S3
export const getUrl = async () => {

    const input={
        "Bucket":"focuspoint-dev",
        "Key":"ajl-404"

    }
    const command=new GetObjectCommand(input)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log('url of the ajl-404',url)
    
};
