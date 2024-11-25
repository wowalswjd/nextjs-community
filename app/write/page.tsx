import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  let session = await getServerSession(authOptions);
  if (session) {
    console.log("Server : ", session);
  }
  return (
    <div>
      <h5>작성 페이지</h5>
      <form action="api/post/create" method="POST">
        <input type="text" name="title" placeholder="제목" required />
        <textarea name="content" placeholder="내용" required />
        <button type="submit">게시</button>
      </form>
    </div>
  );
}
