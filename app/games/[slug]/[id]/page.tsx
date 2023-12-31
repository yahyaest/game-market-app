import { db } from "@/drizzle";
import { games } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Game } from "@/models/game";
import { rawg } from "@/rawg.io_api/rawg";
import { postProduct } from "@/services/store";

type Params = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function GameInfo({ params }: Params) {
  const Client = new rawg(process.env.RAWG_KEY);
  const { id } = params;

  const getGameInfo = async (id: string) => {
    try {
      const gameInfo = await Client.games.getGameDetails(id);
      const gameScreenshots = await Client.games.getScreenshots(id);
      const gameStores = await Client.games.getStores(id);
      const gameMovies = await Client.games.getTrailers(id);

      const stores: { name: string; url: string }[] = [];
      gameInfo.stores.forEach((item: any) => {
        stores.push({
          name: item.store.name,
          url: gameStores.results.filter(
            (store: any) => store.store_id === item.store.id
          )[0].url,
        });
      });

      const trailers: {
        name: string;
        preview: string;
        data: { 480: string; max: string };
      }[] = [];
      gameMovies.forEach((item: any) => {
        trailers.push({
          name: item.name,
          preview: item.preview,
          data: {
            480: item.data["480"],
            max: item.data.max,
          },
        });
      });

      return {
        title: gameInfo.name, // store product model + game model
        slug: gameInfo.slug, // store product model + game model
        description: gameInfo.description_raw, // store product model + game model
        metacritic: gameInfo.metacritic, //game model + store.external_args
        released: gameInfo.released, //game model + store.external_args
        background_image: gameInfo.background_image, //game model + store.external_args
        background_image_additional: gameInfo.background_image_additional, //game model + store.external_args
        screenshots: gameScreenshots.results.map((item: any) => item.image), //game model + store product_images model
        website: gameInfo.website, //game model + store.external_args
        rating: gameInfo.rating, //game model + store.external_args
        ratings_count: gameInfo.ratings_count, //game model + store.external_args
        platforms: gameInfo.parent_platforms.map(
          (item: any) => item.platform.slug
        ), //game model + store.external_args
        stores, //game model + store.external_args
        trailers, //game model + store.external_args
        developers: gameInfo.developers.map((item: any) => item.name), //game model + store.external_args
        genres: gameInfo.genres.map((item: any) => item.name), //game model + store.external_args
        tags: gameInfo.tags.map((item: any) => item.name), // store product model + game model
        publishers: gameInfo.publishers.map((item: any) => item.name), //game model + store.external_args
      };

      // price, inventory, products_promotions  in store product model
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const addGameToMarket = async (gameInfo: Game) => {
    try {
      const searchGame = await db
        .select()
        .from(games)
        .where(eq(games.slug, gameInfo.slug));

      if (searchGame.length === 0) {
        await db
          .insert(games)
          .values({
            title: gameInfo.title,
            slug: gameInfo.slug,
            description: gameInfo.description,
            metacritic: gameInfo.metacritic,
            released: gameInfo.released,
            background_image: gameInfo.background_image,
            background_image_additional: gameInfo.background_image_additional,
            screenshots: gameInfo.screenshots,
            website: gameInfo.website,
            rating: gameInfo.rating,
            ratings_count: gameInfo.ratings_count,
            platforms: gameInfo.platforms,
            stores: gameInfo.stores,
            trailers: gameInfo.trailers,
            developers: gameInfo.developers,
            genres: gameInfo.genres,
            tags: gameInfo.tags,
            publishers: gameInfo.publishers,
          })
          .returning();
      } else {
        console.log("game already exists");
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const addGameToStore = async (gameInfo: Game) => {
    // TODO : Only Admin can add product to store (activate api auth guard in store django app)
    // TODO : A button "Add To Store" should appear if user is admin and game/product isn't in store ===> a form will appear to select collection, price,inventory, promotions ===> server action

    try {
      // TODO : get products by slug qeury params. if product pass else post peoduct
      const externalArgs = {
        metacritic: gameInfo.metacritic,
        released: gameInfo.released,
        background_image: gameInfo.background_image,
        background_image_additional: gameInfo.background_image_additional,
        website: gameInfo.website,
        rating: gameInfo.rating,
        ratings_count: gameInfo.ratings_count,
        platforms: gameInfo.platforms,
        stores: gameInfo.stores,
        trailers: gameInfo.trailers,
        developers: gameInfo.developers,
        genres: gameInfo.genres,
        publishers: gameInfo.publishers,
      };

      const payload = {
        title: gameInfo.title,
        slug: gameInfo.slug,
        description: gameInfo.description,
        price: 0,
        inventory: 0,
        collection_id: 0,
        external_args: externalArgs,
      };

      const storeProduct = await postProduct(payload);
      console.log(storeProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const gameInfo = await getGameInfo(id);
  await addGameToMarket(gameInfo as Game);
  // console.log(gameInfo);
  // console.log(gameInfo.trailers);
  return gameInfo ? (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <h1>{gameInfo.title}</h1>
      <img src={gameInfo.background_image} alt="" />
      <p>{gameInfo.description}</p>
    </div>
  ) : (
    <div>
      <h1>Failed to get game data</h1>
    </div>
  );
}
