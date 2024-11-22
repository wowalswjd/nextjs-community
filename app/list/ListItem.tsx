"use client";

import Post from "@/models/post";
import axios from "axios";
import { WithId } from "mongodb";
import Link from "next/link";

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  // 삭제 요청 처리 함수
  const handleDelete = async (id: string, e: React.MouseEvent<HTMLElement>) => {
    try {
      // DELETE 요청
      await axios.delete("/api/post/delete", {
        data: { id },
      });

      // UI에서 항목 삭제 처리
      const target = e.target as HTMLElement;
      const parent = target.parentElement;
      if (parent) {
        parent.style.opacity = "0";
        setTimeout(() => {
          parent.style.display = "none";
        }, 1000);
      }
    } catch (error) {
      console.error("삭제 요청 실패:", error);
    }
  };

  return (
    <div>
      {result.map((_, i) => (
        <div className="list-item" key={i}>
          <Link href={"/detail/" + result[i]._id}>
            <h4>{result[i].title}</h4>
          </Link>
          <Link href={"/edit/" + result[i]._id}>✏</Link>
          <span
            onClick={(e) => {
              handleDelete(result[i]._id.toString(), e);
            }}
          >
            🗑️
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
