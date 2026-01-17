import s3Client from "../awsConfig";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto";
import dotenv from 'dotenv';


dotenv.config();

//สร้างชื่อไฟล์ใหม่แบบยาวๆ แบบอ่านไม่รู้เรื่อง
function generateSaltedFilename(originalName: string): string {
  const salt = randomBytes(16).toString("hex");
  const extension = originalName.split(".").pop();
  return `${salt}.${extension}`;
}

export async function uploadFile(
  bucket: string,
  filePath: string,
  file: Express.Multer.File
): Promise<string> {
  const saltedFilename = generateSaltedFilename(file.originalname);
  const saltedFilePath = `${filePath}/${saltedFilename}`;

  const params = {
    Bucket: bucket,
    Key: saltedFilePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("File uploaded successfully:", data);
    return saltedFilePath;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function getPresignedUrl(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: filePath,
  });
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}
