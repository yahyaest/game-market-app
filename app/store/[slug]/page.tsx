import { cookies } from "next/headers";
import GameDetails from "@/components/gameInfoPage/gameDetails";
import GameScreenshot from "@/components/gameInfoPage/gameScreenshots";
import GameTrailer from "@/components/gameInfoPage/gameTrailer";
import Reviews from "@/components/gameInfoPage/reviews";
import { User } from "@/models/user";
import { Product } from "@/models/product";
import { Review } from "@/models/review";
import {
  getProducts,
  getProduct,
  getProductImages,
  getProductReviews,
  postReview,
} from "@/services/store";
import GameStore from "@/components/storePage/gameStore";

type Params = {
  params: {
    slug: string;
  };
};

export default async function ProductStore({ params }: Params) {
  const { slug } = params;
  const user: User = cookies().get("user")
    ? JSON.parse(cookies().get("user")?.value as string)
    : null;
  const token = cookies().get("token")?.value as string;
  const productResponse = await getProducts({ slug });
  const product: Product = await getProduct(productResponse[0].id);
  const productImagesResponse = await getProductImages(product.id);
  const productImages = productImagesResponse.map((e: any) =>
    decodeURIComponent(e.image).replace("/media/", "")
  );
  const productReviewsResponse = await getProductReviews(product.id);

  const checkUserHasReview = async (reviews: Review[]) => {
    if (user) {
      for (const review of reviews) {
        if (review.customer_email === user.email) {
          return true;
        }
      }
    }
    return false;
  };

  const isUserGameReview = await checkUserHasReview(productReviewsResponse);

  const addReview = async (review: Review) => {
    "use server";
    try {
      if (user && token) {
        const searchGameProductInStore: Product[] = await getProducts({ slug });
        if (searchGameProductInStore.length > 0) {
          const productId = searchGameProductInStore[0].id;
          const payload = {
            customer_email: review.email,
            customer_image: review.userImage,
            customer_name: review.username,
            comment: review.comment,
            rating: review.rating,
            product_id: productId,
          };
          postReview(token, payload);
        }
      } else {
        console.log("no user is connected, Skipping.");
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col justify-between bg-cover bg-no-repeat bg-top p-4 md:p-16"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 1)), url(${product.external_args.background_image})`,
      }}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 mx-2">
          <GameDetails gameInfo={product} />
        </div>
        <div className="w-full lg:w-1/3 mx-2">
          <GameTrailer videoTrailer={product.external_args.youtube_trailer} />
          <GameStore product={product}/>
          <GameScreenshot screenshots={productImages} />
        </div>
      </div>
      <div className="">
        <Reviews
          gameReviews={productReviewsResponse as Review[]}
          isUserGameReview={isUserGameReview}
          addReview={addReview}
        />
      </div>
    </div>
  );
}
