"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { logout } from "@/services/gateway";
import { Button } from "@nextui-org/react";
import { navbarStateIsUser, navbarStateUserAvatarUrl } from "@/store";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
  token: string | undefined;
};

export default function AuthState({ session, token }: Props) {
  const router = useRouter();
  const [userToken, setUserToken] = useState(token);
  const [isUser, setIsUser] = useAtom(navbarStateIsUser);
  const [avatarUrl, setAvatarUrl] = useAtom(navbarStateUserAvatarUrl);

  return (
    <>
      {session || userToken || isUser ? (
        // <Button
        //   className="w-36"
        //   color="primary"
        //   variant="shadow"
        //   onClick={() => {
        //     session ? signOut() : logout();
        //     session ? Cookies.remove("authProvider") : null
        //     setIsUser(false);
        //     setUserToken("");
        //     setAvatarUrl("")
        //   }}
        // >
        //   Sign Out
        // </Button>
        <></>
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
    </>
  );
}
