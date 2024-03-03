"use client";
import React, { useEffect } from "react";
import { getServerSession } from "next-auth";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import Avatar from "@/components/navbar/userAvatar";
// import AuthState from "@/components/navbar/authState";

// Prevent AuthState component from being server-side rendered to resolve the hydration issue.
// The hydration issue often occurs when there is a mismatch between the HTML generated on the server and the HTML expected on the client side during the hydration process.
import dynamic from 'next/dynamic'
const AuthState = dynamic(() => import("@/components/navbar/authState"), {
    ssr: false,
})

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

const checkImage = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.status == 200) {
      return true;
    }
  } catch (error) {}
  return false;
};

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

export default function AppMobileNavbar({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isValidImage, setIsValidImage] = React.useState(false);

  const token = Cookies.get("token");
  
  useEffect(() => {
    const fetchData = async () => {
      const user = Cookies.get("user");
      const userImage = user ? JSON.parse(user).avatarUrl : null;
      const isImage = session
        ? await checkImage(session.user?.image!)
        : userImage
        ? await checkImage(userImage)
        : false;
      setIsValidImage(isImage);
    };
    fetchData();
  }, []);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="sm:hidden"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Avatar session={session} isValidImage={isValidImage} />
        <AuthState session={session} token={token} />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
