"use client";
import { rawg } from "../../rawg.io_api/rawg";
import { errorBase } from "../../rawg.io_api/errors/errorBase";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { useEffect, useState } from "react";

const Client = new rawg(process.env.RAWG_KEY);

const getGames = async (page: number) => {
  const games = await Client.games.getGames({ ordering: "-added", page });
  return games;
};

const renderGamePlatform = (gamePlatforms: any[]) => {
  let platforms = [];
  for (const e of gamePlatforms) {
    platforms.push(e.platform.slug);
  }

  return (
    <>
      {platforms.includes("pc") && <FaWindows />}
      {platforms.includes("playstation") && <FaPlaystation />}
      {platforms.includes("xbox") && <FaXbox />}
      {platforms.includes("nintendo") && <SiNintendo />}
    </>
  );
};

export default function Games() {
  const [games, setGames] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const bgColors = [
    "bg-danger-50",
    "bg-warning-50",
    "bg-success-50",
    "bg-primary-50",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGames(currentPage);
      setGames(data.results);
      setPageNumber(Math.floor(data.count / data.results.length));
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg: lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game: any, index: number) => (
          <Card
            className={`${bgColors[index % bgColors.length]} py-4 mx-auto w-80 cursor-pointer hover:scale-105`}
            key={game.id}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <div className="grid grid-cols-2 gap-20 justify-items-stretch align-items-center">
                <div className="justify-self-start flex flex-raw gap-2 pt-2 text-tiny uppercase font-bold">
                  {renderGamePlatform(game.parent_platforms)}
                </div>
                <div className="justify-self-end pb-2">
                  {game.metacritic && (
                    <Chip color="warning" variant="shadow">
                      {game.metacritic}
                    </Chip>
                  )}
                </div>
              </div>
              <h4 className="font-bold text-large">{game.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt={game.name}
                className="object-cover rounded-xl h-36"
                src={game.background_image}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
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
          console.log(page);
          const data = await getGames(page);
          setGames(data.results);
          setPageNumber(Math.floor(data.count / data.results.length));
          setNextPageUrl(data.next);
          setPreviousPageUrl(data.previous);
        }}
      />
    </div>
  );
}
