'use client'
import React from "react";
import { Button, Input } from "@nextui-org/react";

export default function Login() {
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
            <Input type="email" label="Email" placeholder="Enter your email" />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>

          <div className="space-y-6" style={{ marginTop: "50px" }}>
            <Button className="w-36" color="primary" variant="shadow">
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
            <Button className="w-36" color="primary" variant="shadow">
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
