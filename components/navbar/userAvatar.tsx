"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { navbarStateIsUser, navbarStateUserAvatarUrl } from "@/store";
import { logout } from "@/services/gateway";

type Props = {
  session: any;
  isValidImage: boolean;
};

export default function UserAvatar({ session, isValidImage }: Props) {
  const [userToken, setUserToken] = useState(
    (Cookies.get("token") as string) || ""
  );
  const [username, setUsername] = useState<string | null>("");
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [isUser, setIsUser] = useAtom(navbarStateIsUser);
  const [avatarUrl, setAvatarUrl] = useAtom(navbarStateUserAvatarUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = Cookies.get("user") as any;
      const userImage = user ? JSON.parse(user).avatarUrl : null;
      setAvatarUrl(userImage);
      setUserEmail((user ? JSON.parse(user).email : null) as string);
      setUsername(user ? JSON.parse(user).username : null);
      setIsLoading(false);
    };
    fetchData();
  }, [avatarUrl]);

  return (
    <>
      {isLoading ? (
        <Skeleton className="flex rounded-full w-12 h-12" />
      ) : (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="mx-2">
              {session ? (
                isValidImage ? (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={session.user?.image!}
                  />
                ) : (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    name={session.user?.name!}
                  />
                )
              ) : (
                <></>
              )}
              {username ? (
                avatarUrl ? (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={avatarUrl}
                  />
                ) : (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    name={username}
                  />
                )
              ) : (
                <></>
              )}
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userEmail}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                session ? signOut() : logout();
                session ? Cookies.remove("authProvider") : null;
                setIsUser(false);
                setUserToken("");
                setAvatarUrl("");
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
