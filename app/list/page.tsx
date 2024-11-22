import type Post from "@/models/post";
import axios from "axios";
import type { WithId } from "mongodb";
import Link from "next/link";
import "../global.css";
import ListItem from "./ListItem";

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/post/readList"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };
  const result: WithId<Post>[] = await readPostList();
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
};
export default List;
