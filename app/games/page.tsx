import { rawg } from "../../rawg.io_api/rawg";
import GamesPage from "@/components/gamesPage/games";

export default async function Games() {
  const getGames = async (page: number) => {
    "use server";
    const Client = new rawg(process.env.RAWG_KEY);
    return await Client.games.getGames({ ordering: "-added", page });
  };

  const gamesResponse = await getGames(1);

  return (
    <GamesPage
      serverGamesResponse={gamesResponse}
      gameCount={gamesResponse.count}
      getGames={getGames}
      pageComponent={"games"}
    />
  );
}
