// import type { NextApiHandler } from "next";
// import { postCollection } from "@/utils/database";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";

// const handler: NextApiHandler = async (req, res) => {
//   let session = await getServerSession(req, res, authOptions);

//   if (session) {
//     req.body.author = session.user?.email;
//   }
//   console.log(req.body);

//   if (req.method === "POST") {
//     if (!req.body.title || !req.body.content) {
//       return res.status(500).json({ error: "빈 형식이 있습니다." });
//     }
//     try {
//       const result = await postCollection.insertOne(req.body);
//       return res.redirect(302, "/list");
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };
// export default handler;

import { connectDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    console.log(">>> ", req.body);

    const client = await connectDB;
    const db = client.db("forum");

    if (req.body.title === "") {
      return res.status(400).json("제목 누락");
    }

    // 글작성자 추가
    if (session?.user?.email) {
      req.body.author = session.user.email;
    }    

    try {
      let result = await db.collection("post").insertOne(req.body); // _id는 자동생성
      return res.redirect(302, "/list");
    } catch (err) {
      return res.status(500).json("DB 에러");
    }
  }
}
