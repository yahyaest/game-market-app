"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { Button, Input } from "@nextui-org/react";
import {
  getCurrentUser,
  getCurrentUserAvatar,
  login,
} from "@/services/gateway";
import { navbarStateIsUser, navbarStateUserAvatarUrl } from "@/jotaiStore";
import { User } from "@/models/user";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUser, setIsUser] = useAtom(navbarStateIsUser);
  const [avatarUrl, setAvatarUrl] = useAtom(navbarStateUserAvatarUrl);
  const router = useRouter();

  const submit = async () => {
    try {
      const isLogin = await login(email, password);
      if (!isLogin) {
        alert("Wrong Credential");
      } else {
        const user = (await getCurrentUser()) as User;
        const token = Cookies.get("token");
        const userImage = (await getCurrentUserAvatar(
          token as string
        )) as string;
        user.avatarUrl = userImage;
        Cookies.set("user", JSON.stringify(user));
        setIsUser(true);
        setAvatarUrl(userImage);
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <div className="space-y-6">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-6" style={{ marginTop: "50px" }}>
            <Button
              className="w-36"
              color="primary"
              variant="shadow"
              onClick={() => submit()}
            >
              Sign In
            </Button>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="#"
                className="font-semibold leading-6 text-primary hover:text-secondary ml-2"
                onClick={() => router.push("/register")}
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
