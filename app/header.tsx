"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function Header({ session }: Props) {
  const router = useRouter();
  console.log("session : ", session);
  return (
    <header className="flex justify-between p-5 bg-blue-400">
      <p className="font-bold text-white">{session ? "session" : "Header"}</p>
      <div className="flex">
        {session && session.user?.image! && (
          <Image
            className="mx-2 rounded-full"
            src={session.user?.image!}
            alt={"user_icon"}
            width={40}
            height={40}
          />
        )}
        {session ? (
          <Button
            className="w-36"
            color="primary"
            variant="shadow"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            className="w-36"
            color="primary"
            variant="shadow"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
