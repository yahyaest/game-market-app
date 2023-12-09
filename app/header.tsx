import React from "react";
import { getServerSession } from "next-auth";
import Avatar from "@/components/navbar/userAvatar";
import AuthState from "@/components/navbar/authState";
import { cookies } from "next/headers";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function Header({ session }: Props) {
  const token = cookies().get("token")?.value;

  return (
    <header className="flex justify-between p-5 bg-blue-400">
      <p className="font-bold text-white">{session ? "session" : "Header"}</p>
      <div className="flex">
        <Avatar session={session} token={token}/>
        <AuthState session={session} token={token}/>
      </div>
    </header>
  );
}

export default Header;
