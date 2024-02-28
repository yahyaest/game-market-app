"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@nextui-org/react";

type Props = {
  deleteProductsCart: () => Promise<any>;
  removeCartNotification: () => Promise<any>;
};

export default function CartActions({
  deleteProductsCart,
  removeCartNotification,
}: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-row my-5 space-x-2">
      <Button color="success" variant="flat">
        Submit Order
      </Button>
      <Button
        color="danger"
        variant="flat"
        onPress={() => {
          deleteProductsCart();
          removeCartNotification();
          Cookies.remove("cartId");
          router.push("/");
        }}
      >
        Remove Cart
      </Button>
    </div>
  );
}
