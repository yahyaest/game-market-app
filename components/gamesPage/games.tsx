"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import PaginationComponent from "@/components/gamesPage/pagination";

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

type Props = {
  getGames: (page: number) => Promise<any>;
  serverGamesResponse: any;
};

export default function GamesPage({ getGames, serverGamesResponse }: Props) {
  const router = useRouter();
  const [currentGames, setCurrentGames] = useState(serverGamesResponse.results);
  const bgColors = [
    "bg-danger-50",
    "bg-warning-50",
    "bg-success-50",
    "bg-primary-50",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setCurrentGames(serverGamesResponse.results);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg: lg:grid-cols-3 xl:grid-cols-4">
        {currentGames.map((game: any, index: number) => (
          <div
            key={game.id}
            onClick={() => router.push(`/games/${game.slug}/${game.id}`)}
          >
            <Card
              className={`${
                bgColors[index % bgColors.length]
              } py-4 mx-auto w-80 cursor-pointer hover:scale-105`}
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
                <h4
                  className={`${
                    game.name.length <= 30
                      ? "font-bold text-large"
                      : game.name.length <= 45
                      ? "font-bold text-[0.8rem]"
                      : "font-bold text-[0.7rem]"
                  } h-8 `}
                >
                  {game.name}
                </h4>
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
          </div>
        ))}
      </div>
      <PaginationComponent
        serverGamesResponse={serverGamesResponse}
        getGames={getGames}
        setCurrentGames={setCurrentGames}
      />
    </div>
  );
}
