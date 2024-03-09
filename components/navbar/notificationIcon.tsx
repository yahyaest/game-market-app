"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { Notification } from "@/models/notification";
import { FaBell } from "react-icons/fa6";
import { formatRelativeTime } from "@/tools/utils";
import { updateNotification } from "@/services/notification";

type Props = {
  notifications: Notification[];
};

export default function NotificationIcon({ notifications }: Props) {
  const gatewayBaseUrl = process.env.GATEWAY_BASE_URL;
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Badge
          color="warning"
          content={notifications ? notifications.length : 0}
          isInvisible={false}
          shape="circle"
          className="cursor-pointer"
        >
          <FaBell className="w-9" />
        </Badge>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => updateNotification(key as number, { seen: true })}
      >
        {notifications?.length &&
          notifications.map((notification) => (
            <DropdownItem key={notification.id}>
              <div className="flex flex-row justify-between items-center">
                <Avatar src={`${gatewayBaseUrl}/${notification.userImage}`} />
                <div className="w-80 text-center">
                  <h3 className="text-lg font-bold mb-2">
                    {notification.title}
                  </h3>
                  <p className="ml-8 text-xs">{notification.message}</p>
                </div>
                <span className="w-20 text-xs">
                  {formatRelativeTime(notification.createdAt)}
                </span>
                {!notification.seen && <span className="w-3 h-3 bg-blue-500 rounded-full" />}
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
