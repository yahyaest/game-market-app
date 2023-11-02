import { rawg } from "../../rawg.io_api/rawg";
import { errorBase } from "../../rawg.io_api/errors/errorBase";


const Client = new rawg(process.env.RAWG_KEY);

const getGames = async () => {
  const games = await Client.games.getGames({search: "devil may cry"});
  console.log(games.results);
  return games.results
};
export default async function Games() {
 const games : [] = await getGames();
 
   return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
   {games.map((game : any)=> <div>
    <p>{game.name}</p>
    <img src={game.background_image} alt={game.name} />
   </div>)}
    </div>
   );
 }
 


