import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    // 로그인 구현 방식을 작성하는 부분
    GitHubProvider({
      // 깃허브 로그인
      clientId: process.env.NEXTAUTH_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_KEY, // jwt생성시쓰는암호
  debug: true, // 디버그 활성화
});

