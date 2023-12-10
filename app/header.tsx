import React from "react";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import axios from "axios";
import Avatar from "@/components/navbar/userAvatar";
import AuthState from "@/components/navbar/authState";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

const checkImage = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log("url is : ", response.status);
    if (response.status == 200) {
      return true;
    }
  } catch (error) {}
  return false;
};

async function Header({ session }: Props) {
  const token = cookies().get("token")?.value;
  const user = cookies().get("user")?.value as any;

  const userImage = user ? JSON.parse(user).avatarUrl : null;

  const isValidImage = session
    ? await checkImage(session.user?.image!)
    : userImage
    ? await checkImage(userImage)
    : false;

  return (
    <header className="flex justify-between p-5 bg-blue-400">
      <p className="font-bold text-white">{session ? "session" : "Header"}</p>
      <div className="flex">
        <Avatar session={session} isValidImage={isValidImage} />
        <AuthState session={session} token={token} />
      </div>
    </header>
  );
}

export default Header;
