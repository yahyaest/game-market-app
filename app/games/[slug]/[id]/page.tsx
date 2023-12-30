import { rawg } from "@/rawg.io_api/rawg";

type Params = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function GameInfo({ params }: Params) {
  const Client = new rawg(process.env.RAWG_KEY);
  const { id } = params;

  // getGameInfo
  const getGameInfo = async (id: string) => {
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
  };

  const gameInfo = await getGameInfo(id);
  // console.log(gameInfo.trailers);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <h1>{gameInfo.title}</h1>
    </div>
  );
}