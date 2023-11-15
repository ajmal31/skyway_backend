import multer from 'multer';
import multer_s3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY,
    },
    region: 'eu-north-1', //region
});

const myBucket = 'skyway-404';

const s3Storage = multer_s3({
    s3: s3,
    bucket: myBucket,
    acl: 'public-read',
    key: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

function sanitizeFile(file, cb) {
    const fileExts = ['.png', '.jpg', '.jpeg', '.gif'];

    const isAllowExt = fileExts.includes(path.extname(file.originalname.toLowerCase()));

    console.log('allowing extension response', isAllowExt);
    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");
    console.log('mimtype', isAllowedMimeType);

    if (isAllowExt&&isAllowedMimeType) {
        return cb(null, true);
    } else {
        cb('Error: file type not allowed');
    }
}

export const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback);
    },
    limits: {
        fileSize: 1024 * 1024 * 2, // 2MB file size
    },
});
