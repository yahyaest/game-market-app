"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, Pagination } from "@nextui-org/react";
import { Notification } from "@/models/notification";

type Props = {
  notifications: Notification[];
  setCurrentNotifications: Dispatch<SetStateAction<any>>;
  setCurrentPage: Dispatch<SetStateAction<any>>;
  currentPage: number;
  setPageNumber: Dispatch<SetStateAction<any>>;
  pageNumber: number;
  notificationsCount: number;
  notificationFilter: string;
};

export default function PaginationComponent({
  notifications,
  setCurrentNotifications,
  setCurrentPage,
  currentPage,
  setPageNumber,
  pageNumber,
  notificationsCount,
  notificationFilter,
}: Props) {
  // const [pageNumber, setPageNumber] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setPageNumber(Math.ceil(notificationsCount / pageSize));
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row items-center">
      <Pagination
        className="my-5"
        classNames={{
          item: "text-[0.6rem] font-semibold",
        }}
        showControls
        total={pageNumber ? pageNumber : 10}
        page={currentPage}
        initialPage={1}
        onChange={async (page: number) => {
          setCurrentPage(page);
          const displayedNotifications =
            notificationFilter === "all"
              ? notifications.slice(pageSize * (page - 1), pageSize * page)
              : notifications
                  .filter((notification) => !notification.seen)
                  .slice(pageSize * (page - 1), pageSize * page);
          setCurrentNotifications(displayedNotifications);
        }}
      />
      <Button
        className="mx-2"
        radius="full"
        color="primary"
        size="sm"
        onClick={async () => {
          setCurrentPage(selectedPage);
          const displayedNotifications =
            notificationFilter === "all"
              ? notifications.slice(
                  pageSize * (selectedPage - 1),
                  pageSize * selectedPage
                )
              : notifications
                  .filter((notification) => !notification.seen)
                  .slice(
                    pageSize * (selectedPage - 1),
                    pageSize * selectedPage
                  );
          setCurrentNotifications(displayedNotifications);
        }}
      >
        Go To Page
      </Button>
      <Input
        className="w-20 mx-2"
        size="sm"
        type="number"
        min={1}
        max={pageNumber}
        onChange={(e) => {
          setSelectedPage(+e.target.value);
        }}
      />
    </div>
  );
}
