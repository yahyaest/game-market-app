import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useNotificationStore } from "@/zustandStore";
import NotificationComponent from "@/components/notification/notificationComponent";
import { getUserNotifications } from "@/services/notification";
import { User } from "@/models/user";
import { Notification } from "@/models/notification";

export default async function Notification() {
  const user: User = cookies().get("user")
    ? JSON.parse(cookies().get("user")?.value as string)
    : null;

  if (!user) {
    redirect("/login");
  }

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

  return <NotificationComponent notifications={userNotifications} />;
}
