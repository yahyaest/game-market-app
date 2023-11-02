import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";


const Client = new rawg(process.env.RAWG_KEY);

const getGames = async () => {
  const games = await Client.games.getGames({search: "devil may cry"});
  console.log(games.results);
};

getGames();
