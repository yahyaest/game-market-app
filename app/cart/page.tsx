import React from "react";
import { cookies } from "next/headers";
import { getCart } from "@/services/store";
import CartTable from "@/components/cartPage/cartTable";
import { Button, Chip } from "@nextui-org/react";
import { Cart } from "@/models/cart";

export default async function Store() {
  const cartId = cookies().get("cartId")?.value as string;
  const cart: Cart = cartId ? await getCart(cartId) : null;
  return (
    <div className="flex min-h-screen flex-col p-4 md:p-16">
      {cartId ? (
        <div>
          <h1 className="text-center text-amber-600 text-3xl font-bold my-5">
            Cart with {cart.items_count} Games
          </h1>
          <CartTable cart={cart} />
          <div className="flex flex-col sm:flex-row sm:space-x-2 my-5">
            <Chip color="primary" variant="shadow" className="my-2">
              Total Price : {cart.total_price} $
            </Chip>
            <Chip color="secondary" variant="shadow" className="my-2">
              Total Price After Discount : {cart.total_price_after_discount} $
            </Chip>
          </div>
          <div className="flex flex-row my-5 space-x-2">
            <Button color="success" variant="flat">
              Set Order
            </Button>
            <Button color="danger" variant="flat">
              Remove Cart
            </Button>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-amber-600 text-3xl font-bold">
          Cart is empty
        </h1>
      )}
    </div>
  );
}
