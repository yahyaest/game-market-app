"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, Pagination } from "@nextui-org/react";

type Props = {
  getGames: (page: number) => Promise<any>;
  setCurrentGames: Dispatch<SetStateAction<any>>;
  serverGamesResponse: any;
};

export default function PaginationComponent({
  getGames,
  setCurrentGames,
  serverGamesResponse,
}: Props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setPageNumber(
        Math.floor(
          serverGamesResponse.count / serverGamesResponse.results.length
        )
      );
      setNextPageUrl(serverGamesResponse.next);
      setPreviousPageUrl(serverGamesResponse.previous);
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
          const data = await getGames(page);
          setCurrentGames(data.results);
          setNextPageUrl(data.next);
          setPreviousPageUrl(data.previous);
        }}
      />
      <Button
        className="mx-2"
        radius="full"
        color="primary"
        size="sm"
        onClick={async () => {
          setCurrentPage(selectedPage);
          const data = await getGames(selectedPage);
          setCurrentGames(data.results);
          setNextPageUrl(data.next);
          setPreviousPageUrl(data.previous);
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
