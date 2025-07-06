// pages/api/s3-get-signed-url.js (o .ts si usas TypeScript)
import { auth } from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: "us-east-1", // ajusta tu región
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_AWS!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
  },
});

export const POST = auth(async (request) => {
  try {
    const { fileName, fileType } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "fileName y fileType son requeridos" }, { status: 400 });
    }

    const key = `uploads/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    // Genera signed URL válido por 10 minutos
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 600 });

    // Construye URL pública usando CloudFront o S3 directo
    const publicUrl = `https://df50lbm4qcrt6.cloudfront.net/uploads/${fileName}`;

    return NextResponse.json({ signedUrl, publicUrl });
  } catch (error: unknown) {
    console.error("Error en /api/s3-get-signed-url:", error);
    return NextResponse.json({ error: "Error generando signed URL", details: (error as Error).message }, { status: 500 });
  }
});
