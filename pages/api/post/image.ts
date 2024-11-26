import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  aws.config.update({
    // aws 세팅
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3(); // s3 세팅
  const url = await s3.createPresignedPost({
    // presign url 만드는 함수
    Bucket: process.env.BUCKET_NAME,
    Fields: { key: req.query.file }, // 유저가 전달한 파일 name
    Expires: 60, // seconds (url 유효 기간)
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  res.status(200).json(url); // url 전송
}
