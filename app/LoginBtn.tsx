"use client";

import { signIn } from "next-auth/react";

export default function LoginBtn() {
  const onLogin = () => {
    signIn("github");
  };
  return <button onClick={onLogin}>로그인</button>;
}
