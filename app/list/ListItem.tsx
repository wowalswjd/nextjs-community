"use client";

import Post from "@/models/post";
import { WithId } from "mongodb";
import Link from "next/link";

export default function ListItem({ result }: { result: WithId<Post>[] }) {
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
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[i]._id.toString(),
              })
                .then((r) => r.json())
                .then(() => {
                  const target = e.target as HTMLElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.opacity = "0";
                    setTimeout(() => {
                      parent.style.display = "none";
                    }, 1000);
                  }
                });
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
