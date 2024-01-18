"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Rating } from "primereact/rating";
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { Review } from "@/models/review";
import { User } from "@/models/user";

type Props = {
  gameReviews: Review[];
  isUserGameReview: boolean;
  addReview: (review: Review) => Promise<any>;
};

export default function Reviews({
  gameReviews,
  isUserGameReview,
  addReview,
}: Props) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReview = async () => {
    try {
      setIsLoading(true);
      const user: User = JSON.parse(Cookies.get("user") as string);
      const payload = {
        username: user.username,
        email: user.email,
        userImage: user.avatarUrl
          ? user.avatarUrl.substring(user.avatarUrl.lastIndexOf("/") + 1)
          : null,
        customer_name: user.username,
        customer_email: user.email,
        comment,
        rating,
      };
      await addReview(payload);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error : ", error);
    }
  };

  const user: User | null = Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : null;

  const averageRating = gameReviews.length
    ? (
        gameReviews.reduce((sum, review) => sum + review.rating, 0) /
        gameReviews.length
      ).toFixed(1)
    : 0;

  return (
    <>
      {!isUserGameReview && user && (
        <div className="my-3">
          <h1 className="text-red-800 text-xl font-bold"> Add Your Review</h1>
          <Rating
            value={rating}
            onChange={(e) => setRating(e.value)}
            cancel={false}
          />
          <Textarea
            label="Game Review"
            placeholder="Enter your game review"
            onChange={(e) => setComment(e.currentTarget.value)}
            className="my-5"
          />
          {isLoading ? (
            <Button color="warning" variant="flat" isLoading>
              Loading
            </Button>
          ) : (
            <Button
              color="warning"
              variant="flat"
              isDisabled={!Boolean(rating && comment)}
              onClick={() => handleReview()}
            >
              Send
            </Button>
          )}
        </div>
      )}

      <div>
        {gameReviews.length > 0 && (
          <h1 className="text-red-800 text-xl font-bold">
            {gameReviews.length} {gameReviews.length > 1 ? "Reviews" : "Review"}{" "}
            ({averageRating})
          </h1>
        )}
        {gameReviews.map((review: Review) => (
          <div
            key={review.id}
            className={`${
              user
                ? user.email === review.email
                  ? "transition ease-in-out delay-300 bg-red-700 hover:bg-red-600"
                  : "transition ease-in-out delay-300 bg-slate-700 hover:bg-slate-600"
                : "transition ease-in-out delay-300 bg-slate-700 hover:bg-slate-600"
            } bg-opacity-20 hover:bg-opacity-25 rounded-xl p-4 my-5 space-y-2`}
          >
            <div className="flex flex-row space-x-3">
              {review.userImage && (
                <Avatar
                  src={`${process.env.GATEWAY_BASE_URL}/${review.userImage}`}
                />
              )}
              <p className="text-amber-500 text-lg font-semibold">
                {review.username}
                {user ? (user.email === review.email ? " (me)" : null) : null}
              </p>
            </div>
            <div className="flex flex-row space-x-3">
              <Rating
                value={review.rating}
                disabled
                cancel={false}
              />
              {review.createdAt && (
                <p className="text-slate-600 text-md font-medium">
                  {review.createdAt.toLocaleDateString("en-GB")}
                </p>
              )}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
