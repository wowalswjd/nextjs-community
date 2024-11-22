import type { NextApiHandler } from "next";
import { WithId, ObjectId } from "mongodb";
import type Post from "@/models/post";
import { postCollection } from "@/utils/database";
const handler: NextApiHandler<WithId<Post>> = async (req, res) => {
  const { id } = req.query;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });
  return res.status(200).json(result);
};
export default handler;
