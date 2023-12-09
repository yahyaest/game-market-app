"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { logout } from "@/services/gateway";
import { Button } from "@nextui-org/react";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
  token : string | undefined
};

export default function AuthState({ session, token }: Props) {
  const router = useRouter();
  return (
    <>
      {session || token ? (
        <Button
          className="w-36"
          color="primary"
          variant="shadow"
          onClick={() => (session ? signOut() : logout())}
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
    </>
  );
}
