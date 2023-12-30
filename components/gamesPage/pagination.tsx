"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";

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
    <Pagination
      className="my-5"
      classNames={{
        item: "text-[0.6rem] font-semibold",
      }}
      showControls
      total={pageNumber ? pageNumber : 10}
      initialPage={1}
      onChange={async (page: number) => {
        setCurrentPage(page);
        const data = await getGames(page);
        setCurrentGames(data.results);
        setPageNumber(Math.floor(data.count / data.results.length));
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
      }}
    />
  );
}
