"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, Pagination } from "@nextui-org/react";
import { Notification } from "@/models/notification";

type Props = {
  notifications: Notification[];
  setCurrentNotifications: Dispatch<SetStateAction<any>>;
  notificationsCount: number;
};

export default function PaginationComponent({
  notifications,
  setCurrentNotifications,
  notificationsCount,
}: Props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setPageNumber(
        Math.floor(
          notificationsCount / pageSize
        ) + 1
      );
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
          setCurrentNotifications(notifications.slice(pageSize * (page - 1), pageSize * page));
        }}
      />
      <Button
        className="mx-2"
        radius="full"
        color="primary"
        size="sm"
        onClick={async () => {
          setCurrentPage(selectedPage);
          setCurrentNotifications(notifications.slice(pageSize * (selectedPage - 1), pageSize * selectedPage));
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
