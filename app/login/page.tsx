import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import AuthForm from "./AuthForm";
import AuthProviders from "./AuthProviders";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export default async function Login() {
  const session = await getServerSession();
  const providers = await getProviders();
  const token = cookies().get('token')?.value

  if(token || session){
    redirect("/")
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <AuthForm />
      <AuthProviders providers={providers} />
    </div>
  );
}
