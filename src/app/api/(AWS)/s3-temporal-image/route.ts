// pages/api/s3-upload-image.js
import { auth } from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: 'us-east-1', // Cambia a la región que necesites
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_AWS!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
  },
});

export const POST = auth(async (request) => {
  const formData = await request.formData();
  const file = formData.get("file"); // el campo "file" del form-data

  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `uploads/image_${Date.now()}.png`;

  const putCommand = new PutObjectCommand({
    Bucket: 'website-contia',
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(putCommand);

  const publicUrl = `https://df50lbm4qcrt6.cloudfront.net/${fileName}`; // URL de CloudFront

  return NextResponse.json({ url: publicUrl });
});
