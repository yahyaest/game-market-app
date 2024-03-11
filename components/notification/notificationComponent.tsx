"use client";
import React, { Key, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Notification } from "@/models/notification";
import PaginationComponent from "./pagination";
import NotificationTabs from "./notificationTabs";
import { formatRelativeTime } from "@/tools/utils";
import { updateNotification } from "@/services/notification";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "TITLE", uid: "title" },
  { name: "MESSAGE", uid: "message" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "ACTION", uid: "action" },
];

type Props = {
  notifications: Notification[];
};

export default function NotificationComponent({ notifications }: Props) {
  const gatewayBaseUrl = process.env.GATEWAY_BASE_URL;
  const [notificationFilter, setNotificationFilter] = useState<string>("all");
  const [currentNotifications, setCurrentNotifications] = useState<
    Notification[]
  >(notifications.slice(0, 20));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(
    Math.ceil(notifications.length / pageSize)
  );

  const renderCell = (notification: Notification, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-row space-x-3">
            <Avatar
              src={`${gatewayBaseUrl}/${notification.userImage}`}
              alt={notification.title}
            />
            <h1 className="mt-2">{notification.sender} </h1>
          </div>
        );
      case "title":
        return <div>{notification.title}</div>;
      case "message":
        return <div>{notification.message}</div>;
      case "createdAt":
        return <div>{formatRelativeTime(notification?.createdAt ?? "")}</div>;
      case "action":
        if (!notification.seen) {
          return (
            <Button
              color="warning"
              variant="flat"
              radius="lg"
              size="sm"
              onClick={async () => {
                await updateNotification(notification.id as number, {
                  seen: true,
                });
                location.reload();
              }}
            >
              Mark As Read
            </Button>
          );
        } else return <div></div>;
      default:
        return <div></div>;
    }
  };

  const NotificationTable = (props: { notifications: Notification[] }) => {
    const { notifications } = props;
    return (
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={notifications}>
          {(notification) => (
            <TableRow key={notification.id}>
              {(columnKey) => (
                <TableCell>{renderCell(notification, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-16">
      <NotificationTabs
        notifications={notifications}
        setCurrentNotifications={setCurrentNotifications}
        setNotificationFilter={setNotificationFilter}
        setCurrentPage={setCurrentPage}
        setPageNumber={setPageNumber}
      />
      <div className="w-full">
        {currentNotifications && currentNotifications.length > 0 ? (
          <div>
            <h1 className="text-center text-amber-600 text-3xl font-bold my-5">
              You have {notifications.length} Notifications
            </h1>
            <NotificationTable notifications={currentNotifications} />
          </div>
        ) : (
          <h1 className="text-center text-amber-600 text-3xl font-bold">
            There is no Notifications
          </h1>
        )}
      </div>
      {notifications && pageNumber > 1 && (
        <PaginationComponent
          notifications={notifications}
          notificationsCount={notifications.length}
          setCurrentNotifications={setCurrentNotifications}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          notificationFilter={notificationFilter}
        />
      )}
    </div>
  );
}
