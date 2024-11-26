"use client";

import Link from "next/link";
import LoginBtn from "./LoginBtn";
import { Session } from "next-auth";
import LogoutBtn from "./LogoutBtn";

type HeaderProps = {
  session: Session | null;
};

export default function Header({ session }: HeaderProps) {
  return (
    <div className="navbar">
      <Link href="/" className="logo">
        EFUB4 Forum
      </Link>
      <Link href="/list">List</Link>
      <Link href="/write">Write</Link>

      {session ? (
        <span>
          <span>{session?.user?.name && `${session.user.name}님 `}</span>
          <LogoutBtn />
        </span>
      ) : (
        <LoginBtn />
      )}
    </div>
  );
}
