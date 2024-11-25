import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        if (!credentials) {
          console.log("credentials가 제공되지 않았습니다.");
          return null; // 인증 실패
        }

        let db = (await connectDB).db("forum");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials?.email });

        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }

        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일 설정
  // session을 쓸지 jwt를 쓸지 결정하는 곳
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일 (로그인 30일동안 유지)
  },
  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    // 유저에게 보내는 jwt에 어떤 내용을 담을 것인가
    // user변수는 DB의 유저 정보 담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          name: user.name || "",
          email: user.email || "",
        };
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    // 컴포넌트에서 세션을 조회 할 때 유저 정보 중 어떤 것을 출력할 것인가
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = token.user; // 커스텀 데이터를 세션에 추가
      } // 토큰의 모든 데이터를 컴포넌트에게 전달하기
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT_KEY as string,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
