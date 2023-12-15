"use client";
import React from "react";
import { signIn, getProviders } from "next-auth/react";
import Cookies from "js-cookie";
import styles from "./styles.module.css";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

export default function AuthProviders({ providers }: Props) {
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

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
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
              onClick={() => {
                signIn(provider.id, {
                  callbackUrl: process.env.PROD_URL || "http://localhost:3000",
                });
                Cookies.set("authProvider", provider.id.toUpperCase());
              }}
            >
              <div className="flex justify-center align-center">
                {Icon && <Icon className="mx-3" style={{ width: "15px" }} />}
                <p className="text-sm">{`Sign up with ${provider.name}`}</p>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
