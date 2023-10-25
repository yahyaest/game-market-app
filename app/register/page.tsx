"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getCurrentUser, register, uploadImage } from "@/services/gateway";
import { Button, Input } from "@nextui-org/react";
import styles from "./styles.module.css";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [file, setFile] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const previewImage = (e: any) => {
    setUploading(true);
    const file = e.target.files[0];
    setFile(file);
    setPreviewURL(URL.createObjectURL(file));
    setUploading(false);
  };

  const submit = async () => {
    try {
      if (password !== password2) {
        alert("Passwords does not match");
      }
      const isRegister = await register(username, email, password, phoneNumber);
      if (!isRegister) {
        alert("Wrong Credential");
      } else {
        const user = await getCurrentUser();
        Cookies.set("user", JSON.stringify(user));
        // upload image
        await uploadImage(file, user?.email as string);
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
          Create new Account
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
              type="text"
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="password"
              label="Password Confirmation"
              placeholder="Enter your password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="number"
              label="Phone"
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(+e.target.value)}
            />
          </div>

          <h2 className="font-semibold leading-6 text-start">
            Upload Your Account Photo
          </h2>

          <div className="max-w-screen-md w-full">
            <div className="form-control w-full max-w-xs my-10 mx-auto text-center">
              {previewURL && (
                <img
                  src={previewURL}
                  alt="photoURL"
                  width="350"
                  height="350"
                  className="mx-auto"
                />
              )}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <input
                  className={`${styles.file_input}  text-primary  w-full max-w-xs`}
                  type="file"
                  accept="image/*"
                  onChange={previewImage}
                />
              </div>

              {uploading && (
                <div>
                  <p>Uploading...</p>
                  <progress className="progress progress-info w-56 mt-6" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6" style={{ marginTop: "50px" }}>
            <Button
              className="w-36"
              color="primary"
              variant="shadow"
              onClick={() => submit()}
            >
              Register
            </Button>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?
              <a
                href="#"
                className="font-semibold leading-6 text-primary hover:text-secondary ml-2"
              >
                Sign In
              </a>
            </p>
            <Button
              className="w-36"
              color="primary"
              variant="shadow"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
