import { getCurrentUserAvatar } from "@/services/gateway";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";

type Props = {
  session: any;
  token: string | undefined;
};

const checkImage = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.status == 200) {
      return true;
    }
  } catch (error) {}
  return false;
};

export default async function UserAvatar({ session, token }: Props) {
  const userImage = token ? await getCurrentUserAvatar(token) : null;
  const username = token
    ? JSON.parse(cookies().get("user")?.value as any).username
    : null;
  const validImage = session
    ? await checkImage(session.user?.image!)
    : userImage
    ? await checkImage(userImage)
    : false;

  console.log("validImage : ", validImage);

  return (
    <div className="mx-2">
      {session ? (
        validImage ? (
          <Avatar src={session.user?.image!} />
        ) : (
          <Avatar name={session.user?.name!} />
        )
      ) : (
        <></>
      )}

      {userImage ? (
        validImage ? (
          <Avatar src={`${userImage}`} />
        ) : (
          <Avatar name={username} />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
