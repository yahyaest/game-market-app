"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { Avatar } from "@nextui-org/react";
import { navbarStateUserAvatarUrl } from "@/store";

type Props = {
  session: any;
  isValidImage: boolean;
};

export default function UserAvatar({ session, isValidImage }: Props) {
  const [username, setUsername] = useState<string | null>("");
  const [avatarUrl, setAvatarUrl] = useAtom(navbarStateUserAvatarUrl);

  useEffect(() => {
    const fetchData = async () => {
      const user = Cookies.get("user") as any;
      const userImage = user ? JSON.parse(user).avatarUrl : null;
      setAvatarUrl(userImage);
      setUsername(user ? JSON.parse(user).username : null);
    };
    fetchData();
  }, [avatarUrl]);

  return (
    <div className="mx-2">
      {session ? (
        isValidImage ? (
          <Avatar src={session.user?.image!} />
        ) : (
          <Avatar name={session.user?.name!} />
        )
      ) : (
        <></>
      )}

      {username ? (
        avatarUrl ? (
          <Avatar src={avatarUrl} />
        ) : (
          <Avatar name={username} />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
