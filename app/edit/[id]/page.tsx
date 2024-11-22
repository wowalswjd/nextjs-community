import { postCollection } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <h5>작성 페이지</h5>
      <form action="/api/post/edit" method="POST">
        <input
          type="text"
          name="title"
          placeholder="글 제목"
          required
          defaultValue={result?.title}
        />
        <textarea
          name="content"
          placeholder="내용"
          required
          defaultValue={result?.content}
        />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result?._id.toString()}
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
