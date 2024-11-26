import type Post from "@/models/post";
import type { WithId } from "mongodb";
import axios from "axios";

interface Props {
  params: { id: string; searchParams: string };
}

const Detail = async (props: Props) => {
  const { id } = await props.params;

  const readPostDetail = async (): Promise<WithId<Post>> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/readDetail?id=${id}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const post: WithId<Post> = await readPostDetail();

  return (
    <div>
      <h5>상세 페이지</h5>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.imgUrl && <img src={post.imgUrl} />}
    </div>
  );
};

export default Detail;
