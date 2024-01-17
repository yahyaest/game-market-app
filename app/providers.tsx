"use client";

import { NextUIProvider } from "@nextui-org/react";
import { PrimeReactProvider } from 'primereact/api';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export function Providers({ children, session }: { children: React.ReactNode , session:Session | null}) {
  return (
    <SessionProvider session={session}>
      <PrimeReactProvider>
      <NextUIProvider>{children}</NextUIProvider>
      </PrimeReactProvider>
    </SessionProvider>
  );
}
