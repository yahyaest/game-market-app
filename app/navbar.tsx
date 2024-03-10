import React from "react";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import axios from "axios";
import Avatar from "@/components/navbar/userAvatar";
import AuthState from "@/components/navbar/authState";
import NotificationIcon from "@/components/navbar/notificationIcon";
import { getCart } from "@/services/store";
import { getUserNotifications } from "@/services/notification";
import { User } from "@/models/user";
import { Cart } from "@/models/cart";
import { Notification } from "@/models/notification";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Badge,
  Tooltip,
} from "@nextui-org/react";
import { FaCartShopping } from "react-icons/fa6";
import { useNotificationStore } from "@/store2";
import { NotificationStoreInitializer } from "@/components/storeInitializer";

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

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
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

async function AppNavbar({ session }: Props) {
  const token = cookies().get("token")?.value;
  const user: User = cookies().get("user")
    ? JSON.parse(cookies().get("user")?.value as string)
    : null;
  const cartId = cookies().get("cartId")?.value as string;

  const userImage = user ? user.avatarUrl : null;

  const isValidImage = session
    ? await checkImage(session.user?.image!)
    : userImage
    ? await checkImage(userImage)
    : false;

  const cart: Cart = cartId ? await getCart(cartId) : null;
  let userNotifications: Notification[] = user
    ? await getUserNotifications(user.email)
    : null;
  if (userNotifications) {
    userNotifications = userNotifications.sort(
      (a: Notification, b: Notification) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    useNotificationStore.setState({
      navbarNotifications: userNotifications
        .filter((notification) => !notification.seen)
        .slice(0, 5),
      navbarNotificationsCount: userNotifications.filter(
        (notification) => !notification.seen
      ).length,
    });
  }

  return (
    <>
      {userNotifications && (
        <NotificationStoreInitializer
          navbarNotifications={userNotifications
            .filter((notification) => !notification.seen)
            .slice(0, 5)}
          navbarNotificationsCount={
            userNotifications.filter((notification) => !notification.seen)
              .length
          }
        />
      )}
      <Navbar isBordered className="hidden sm:flex">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit"> </p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem>
              <Link color="foreground" href="/games">
                Games
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="/store" aria-current="page" color="secondary">
                Store
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Total Price</div>
                <div className="text-tiny">
                  {cart ? cart.total_price_after_discount.toFixed(1) : 0} $
                </div>
              </div>
            }
          >
            <Link href="/cart">
              <Badge
                color="warning"
                content={cart?.items_count ? cart?.items_count : 0}
                isInvisible={false}
                shape="circle"
                className="cursor-pointer"
              >
                <FaCartShopping className="w-9 text-white" />
              </Badge>
            </Link>
          </Tooltip>
          {user && <NotificationIcon notifications={userNotifications} />}
          <Avatar session={session} isValidImage={isValidImage} />
          <AuthState session={session} token={token} />
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default AppNavbar;
