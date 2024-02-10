import GamesPage from "@/components/gamesPage/games";
import { Product } from "@/models/product";
import { getPagedProducts } from "@/services/store";

export default async function Store() {
  const productsResponse = await getPagedProducts();
  const products: Product[] = productsResponse?.products;
  const productsCount: number = productsResponse?.productsCount;

  const getGames = async (page: number) => {
    "use server";
    const productsResponse = await getPagedProducts(page);
    return productsResponse?.products;
  };

  return (
    <GamesPage
      serverGamesResponse={{ results: products }}
      gameCount={productsCount}
      getGames={getGames}
      pageComponent={"store"}
    />
  );
}
