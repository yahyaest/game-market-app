import { cookies } from "next/headers";
import { db } from "@/drizzle";
import { favourite_games, games, reviews } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { Game } from "@/models/game";
import { rawg } from "@/rawg.io_api/rawg";
import { getCollections, getProducts, postProduct, postReview } from "@/services/store";
import { Chip } from "@nextui-org/react";
import { User } from "@/models/user";
import { Collection } from "@/models/collection";
import AddToStore from "@/components/gameInfoPage/addToStore";
import AddToFavourites from "@/components/gameInfoPage/addToFavourites";
import GameScreenshot from "@/components/gameInfoPage/gameScreenshots";
import Reviews from "@/components/gameInfoPage/reviews";
import parse from "html-react-parser";
import {
  FaGamepad,
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaAndroid,
  FaLinux,
  FaAppStoreIos,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { RiMacbookFill } from "react-icons/ri";
import { Product } from "../../../../models/product";
import { Review } from "@/models/review";

type Params = {
  params: {
    id: string;
    slug: string;
  };
};

const FieldInfo = (props: { label: string; value: JSX.Element }) => {
  return (
    <div className="flex flex-col my-3">
      <p className="text-gray-600 font-bold">{props.label}</p>
      <div>{props.value}</div>
    </div>
  );
};
const PlatformIcon = (props: { platform: string }) => {
  if (props.platform === "pc") {
    return <FaWindows className="m-1" size={18} />;
  }
  if (props.platform === "linux") {
    return <FaLinux className="m-1" size={18} />;
  }
  if (props.platform === "playstation") {
    return <FaPlaystation className="m-1" size={18} />;
  }
  if (props.platform === "xbox") {
    return <FaXbox className="m-1" size={18} />;
  }
  if (props.platform === "nintendo") {
    return <SiNintendo className="m-1" size={18} />;
  }
  if (props.platform === "android") {
    return <FaAndroid className="m-1" size={18} />;
  }
  if (props.platform === "ios") {
    return <FaAppStoreIos className="m-1" size={18} />;
  }
  if (props.platform === "mac") {
    return <RiMacbookFill className="m-1" size={18} />;
  } else return <FaGamepad className="m-1" size={18} />;
};

export default async function GameInfo({ params }: Params) {
  const Client = new rawg(process.env.RAWG_KEY);
  const { id } = params;
  const user: User = cookies().get("user")
    ? JSON.parse(cookies().get("user")?.value as string)
    : null;
  const token = cookies().get("token")?.value as string;
  const storeCollection: Collection[] = await getCollections();

  let constructorObject = {
    isGameInStore: false,
    isGameUserFavourite: false,
    userGameFavouriteStatus: "",
  };

  const pageConstructor = async (constructorObject: any) => {
    try {
      const gameInfo = await getGameInfo(id);
      // Find Game in Store
      const searchGameInStore: Product[] = await getProducts({
        slug: gameInfo?.slug,
      });
      if (searchGameInStore.length > 0) {
        console.log(`Game ${gameInfo?.title} is already in store.`);
        constructorObject.isGameInStore = true;
      }
      // Find whether Game is User Favourite
      const searchGame = await db
        .select()
        .from(games)
        .where(eq(games.slug, params.slug));

      const gameId = searchGame[0].id;

      const searchFavouriteGame = await db
        .select()
        .from(favourite_games)
        .where(
          and(
            eq(favourite_games.email, user.email),
            eq(favourite_games.gameId, gameId)
          )
        );
      if (searchFavouriteGame.length > 0) {
        console.log(
          `Game ${gameInfo?.title} is already in user ${user.email} favourite List.`
        );
        constructorObject.isGameUserFavourite = true;
        constructorObject.userGameFavouriteStatus =
          searchFavouriteGame[0].status;
      }
      return constructorObject;
    } catch (err) {
      console.error(err);
    }
  };

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
        description_html: gameInfo.description,
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

  const updateGame = async (payload: any) => {
    "use server";
    try {
      await db.update(games).set(payload).where(eq(games.slug, params.slug));
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteGameToMarket = async (gameStatus: string, user: User) => {
    "use server";
    try {
      if (user) {
        console.log("User exists:", user);
        const searchGame = await db
          .select()
          .from(games)
          .where(eq(games.slug, params.slug));

        const gameId = searchGame[0].id;
        await db
          .insert(favourite_games)
          .values({
            username: user.username,
            email: user.email,
            status: gameStatus,
            gameId: gameId,
          })
          .returning();
      } else {
        console.log("no user is connected, Skipping.");
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

  const addReview = async (review: Review) => {
    "use server";
    try {
      if (user && token) {
        // Post review to Market App
        const searchGame = await db
          .select()
          .from(games)
          .where(eq(games.slug, params.slug));

        const gameId = searchGame[0].id;
        await db
          .insert(reviews)
          .values({
            username: review.username,
            email: review.email,
            comment: review.comment,
            rating: review.rating,
            gameId,
          })
          .returning();
        // Post review to store app
        const searchGameProductInStore: Product[] = await getProducts({
          slug: params.slug,
        });
        if (searchGameProductInStore.length > 0) {
          const productId = searchGameProductInStore[0].id
          const payload = {
              usercustomer_namename: review.username,
              customer_email: review.email,
              comment: review.comment,
              rating: review.rating,
              product_id: productId,
          }
          postReview(token, payload)

        }
      } else {
        console.log("no user is connected, Skipping.");
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  constructorObject = await pageConstructor(constructorObject);
  const gameInfo = await getGameInfo(id);
  await addGameToMarket(gameInfo as Game);

  return gameInfo ? (
    <div
      className="flex min-h-screen flex-col justify-between p-16 bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 1)), url(${gameInfo.background_image})`,
      }}
    >
      <div className="flex flex-row">
        <div className="w-2/3 mx-2">
          <h1 className="text-center text-amber-600 text-3xl font-bold">
            {gameInfo.title}
          </h1>
          <div className="grid grid-cols-1 gap-4 mx-10">
            <FieldInfo
              label={"About"}
              value={
                parse(
                  gameInfo.description_html.replace(/<\/p>/g, "</p><br>")
                ) as any
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FieldInfo
              label={"Platforms"}
              value={gameInfo.platforms.map((platform: string) => (
                <Chip
                  key={platform}
                  startContent={<PlatformIcon platform={platform} />}
                  color="primary"
                  variant="shadow"
                  className="m-1"
                >
                  {platform}
                </Chip>
              ))}
            />
            <FieldInfo
              label={"Genre"}
              value={gameInfo.genres.map((genre: string) => (
                <Chip
                  key={genre}
                  color="danger"
                  variant="shadow"
                  className="m-1"
                >
                  {genre}
                </Chip>
              ))}
            />
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
                <Chip color="warning" variant="shadow" className="m-1">
                  {gameInfo.metacritic}
                </Chip>
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <FieldInfo
              label={"Tags"}
              value={gameInfo.tags.map((tag: string) => (
                <Chip
                  key={tag}
                  color="success"
                  variant="shadow"
                  className="m-1"
                >
                  {tag}
                </Chip>
              ))}
            />
            <FieldInfo
              label={"Website"}
              value={<a href={gameInfo.website}>{gameInfo.website}</a>}
            />
          </div>
        </div>
        <div className="w-1/3 mx-2">
          <GameScreenshot screenshots={gameInfo.screenshots} />
          <div className="flex flex-row justify-center align-middle my-3 space-x-3">
            {user ? (
              user.role === "ADMIN" ? (
                !constructorObject.isGameInStore ? (
                  <AddToStore
                    gameInfo={gameInfo as Game}
                    addGameToStore={addGameToStore}
                    updateGame={updateGame}
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
            {user ? (
              constructorObject.isGameUserFavourite ? (
                <Chip color="warning" variant="bordered" className="my-2">
                  Game {constructorObject.userGameFavouriteStatus}
                </Chip>
              ) : (
                <AddToFavourites
                  addToFavouriteGames={addFavouriteGameToMarket}
                />
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <Reviews addReview={addReview} />
      </div>
    </div>
  ) : (
    <div>
      <h1>Failed to get game data</h1>
    </div>
  );
}
