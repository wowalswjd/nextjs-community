import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string, 
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string, 
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_KEY as string, 
};

export default NextAuth(authOptions);
