import { connectDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(req.body);
    res.status(200).json("성공");
  }
}
