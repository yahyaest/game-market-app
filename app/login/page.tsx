import { getProviders } from "next-auth/react";
import AuthComponent from "./AuthComponent";

export default async function Login() {
const providers = await getProviders()

  return (
   <AuthComponent providers={providers}/>
  );
}
