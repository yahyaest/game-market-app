"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Notification } from "@/models/notification";
import { updateBulkNotification } from "@/services/notification";

type Props = {
  notifications: Notification[];
  setCurrentNotifications: Dispatch<SetStateAction<any>>;
  setNotificationFilter: Dispatch<SetStateAction<any>>;
  setCurrentPage: Dispatch<SetStateAction<any>>;
  setPageNumber: Dispatch<SetStateAction<any>>;
};

export default function NotificationTabs({
  notifications,
  setCurrentNotifications,
  setNotificationFilter,
  setCurrentPage,
  setPageNumber,
}: Props) {
  const [selected, setSelected] = React.useState("all");
  const [pageSize, setPageSize] = React.useState(20);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={async (key) => {
          setSelected(key as string);
          console.log(key);
          if (key === "all") {
            setNotificationFilter("all");
            setCurrentPage(1);
            setPageNumber(Math.ceil(notifications.length / pageSize));
            setCurrentNotifications(notifications);
          } else if (key === "unread_notification") {
            setNotificationFilter("unread_notification");
            setCurrentPage(1);
            const unreadNotifications = notifications.filter(
              (notification) => !notification.seen
            );
            setPageNumber(Math.ceil(unreadNotifications.length / pageSize));
            setCurrentNotifications(unreadNotifications);
          } else if (key === "mark_all_as_read") {
            await updateBulkNotification({ seen: true });
            location.reload();
          } else {
          }
        }}
      >
        <Tab key="all" title="All"></Tab>
        <Tab key="unread_notification" title="Unread Notification"></Tab>
        <Tab key="mark_all_as_read" title="Mark All As Read"></Tab>
      </Tabs>
    </div>
  );
}
