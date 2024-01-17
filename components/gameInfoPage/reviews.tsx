"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Rating } from "primereact/rating";
import { Button, Textarea } from "@nextui-org/react";
import { Review } from "@/models/review";
import { User } from "@/models/user";

type Props = {
  addReview: (review: Review) => Promise<any>;
};

export default function Reviews({ addReview }: Props) {
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
  return (
    <div>
      <Rating
        value={rating}
        onChange={(e) => setRating(e.value)}
        cancel={false}
      />
      <Textarea
        label="Game Review"
        placeholder="Enter your game review"
        onChange={(e) => setComment(e.currentTarget.value)}
        className = "my-5"
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
          onClick = {() => handleReview()}
        >
          Send
        </Button>
      )}
    </div>
  );
}
