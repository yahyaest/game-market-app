"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signIn, getProviders } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";
import { getCurrentUser, login } from "@/services/gateway";
import styles from "./styles.module.css";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

export default function AuthComponent({ providers }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const getIcon = async (providerName: string) => {
    // Dynamic import
    if (providerName === "Google") {
      return (await import("react-icons/fa")).FaGoogle;
    } else if (providerName === "Facebook") {
      return (await import("react-icons/fa")).FaFacebook;
    } else if (providerName === "GitHub") {
      return (await import("react-icons/fa")).FaGithub;
    }

    return null;
  };

  const submit = async () => {
    try {
      const isLogin = await login(email, password);
      if (!isLogin) {
        alert("Wrong Credential");
      } else {
        const user = await getCurrentUser();
        Cookies.set("user", JSON.stringify(user));
        router.push("/");
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
              >
                Register
              </a>
            </p>
            <Button
              className="w-36"
              color="primary"
              variant="shadow"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>

          {Object.values(providers!).map(async (provider) => {
            const Icon = await getIcon(provider.name);
            return (
              <div key={provider.id} className={`${styles.d_grid} mb-2`}>
                <button
                  className={`${styles.btn} ${styles.btn_lg} ${
                    styles[`btn_${provider.id}`]
                  } ${styles.btn_login}
                    ${styles.fw_bold}
                    ${styles.text_uppercase}`}
                  type="submit"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl:
                        process.env.PROD_URL || "http://localhost:3000",
                    })
                  }
                >
                  <div className="flex justify-center align-center">
                    {Icon && (
                      <Icon className="mx-3" style={{ width: "15px" }} />
                    )}
                    <p className="text-sm">{`Sign up with ${provider.name}`}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
