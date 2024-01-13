import { cookies } from "next/headers";
import { db } from "@/drizzle";
import { games } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Game } from "@/models/game";
import { rawg } from "@/rawg.io_api/rawg";
import { getCollections, getProducts, postProduct } from "@/services/store";
import { Chip } from "@nextui-org/react";
import { User } from "@/models/user";
import { Collection } from "@/models/collection";
import AddToStore from "@/components/gameInfoPage/addToStore";
import { Product } from "../../../../models/product";

type Params = {
  params: {
    id: string;
    slug: string;
  };
};

const FieldInfo = (props: { label: string; value: JSX.Element }) => {
  return (
    <div className="flex flex-col my-3">
      <p className="text-gray-600">{props.label}</p>
      <div>{props.value}</div>
    </div>
  );
};

export default async function GameInfo({ params }: Params) {
  const Client = new rawg(process.env.RAWG_KEY);
  const { id } = params;
  const user: User = cookies().get("user")
    ? JSON.parse(cookies().get("user")?.value as string)
    : null;
  const token = cookies().get("token")?.value as string;
  const storeCollection: Collection[] = await getCollections();

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
        title: gameInfo.name,
        slug: gameInfo.slug,
        description: gameInfo.description_raw,
        metacritic: gameInfo.metacritic,
        released: gameInfo.released,
        background_image: gameInfo.background_image,
        background_image_additional: gameInfo.background_image_additional,
        screenshots: gameScreenshots.results.map((item: any) => item.image),
        website: gameInfo.website,
        rating: gameInfo.rating,
        ratings_count: gameInfo.ratings_count,
        platforms: gameInfo.parent_platforms.map(
          (item: any) => item.platform.slug
        ),
        stores,
        trailers,
        developers: gameInfo.developers.map((item: any) => item.name),
        genres: gameInfo.genres.map((item: any) => item.name),
        tags: gameInfo.tags.map((item: any) => item.name),
        publishers: gameInfo.publishers.map((item: any) => item.name),
      };
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

  const addGameToStore = async (
    gameInfo: Game,
    productInfo: any,
    promotions: any
  ) => {
    "use server";
    try {
      console.log(`Adding game ${gameInfo.title} to store`);
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
        description: gameInfo.description.replace(/\n/g, "\n"),
        price: productInfo.price,
        inventory: productInfo.inventory,
        collection: productInfo.collection,
        external_args: externalArgs,
        product_images: gameInfo.screenshots,
        product_tags: gameInfo.tags,
        product_promotions: promotions,
      };

      return await postProduct(token, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const gameInfo = await getGameInfo(id);
  await addGameToMarket(gameInfo as Game);
  // Search game in store
  let isGameInStore = false;
  const searchGameInStore: Product[] = await getProducts({
    slug: gameInfo?.slug,
  });
  if (searchGameInStore.length > 0) {
    console.log(`Game ${gameInfo?.title} is already in store.`);
    isGameInStore = true;
  }

  return gameInfo ? (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="flex flex-row">
        <div>
          <h1>{gameInfo.title}</h1>
          <img src={gameInfo.background_image} alt="" />
          <p>{gameInfo.description}</p>

          <div className="grid grid-cols-2 gap-6">
            <FieldInfo
              label={"Platforms"}
              value={gameInfo.platforms.toString()}
            />
            <FieldInfo label={"Genre"} value={gameInfo.genres.toString()} />
            <FieldInfo
              label={"Developer"}
              value={gameInfo.developers.toString()}
            />
            <FieldInfo
              label={"Publisher"}
              value={gameInfo.publishers.toString()}
            />
            <FieldInfo label={"Release date"} value={gameInfo.released} />
            <FieldInfo
              label={"Metascore"}
              value={
                <Chip color="warning" variant="shadow">
                  {gameInfo.metacritic}
                </Chip>
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <FieldInfo label={"Tags"} value={gameInfo.tags.toString()} />
            <FieldInfo
              label={"Website"}
              value={<a href={gameInfo.website}>{gameInfo.website}</a>}
            />
          </div>
        </div>
        <div className="flex flex-row">
          {user ? (
            user.role === "ADMIN" ? (
              !isGameInStore ? (
                <AddToStore
                  gameInfo={gameInfo as Game}
                  addGameToStore={addGameToStore}
                  storeCollection={storeCollection}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Failed to get game data</h1>
    </div>
  );
}
