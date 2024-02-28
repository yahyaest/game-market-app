import React from "react";
import { cookies } from "next/headers";
import { Chip } from "@nextui-org/react";
import CartTable from "@/components/cartPage/cartTable";
import CartActions from "@/components/cartPage/cartActions";
import { deleteCart, getCart, deleteCartItem } from "@/services/store";
import { addUserNotification } from "@/services/notification";
import { Cart } from "@/models/cart";
import { User } from "@/models/user";
import { Notification } from "@/models/notification";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value as string;
  const cart: Cart = cartId ? await getCart(cartId) : null;

  const deleteProductsCart = async () => {
    "use server";
    const cartId = cookies().get("cartId")?.value as string;
    if (!cartId) return;
    await deleteCart(cartId);
  };

  const deleteProductsCartItem = async (cartItemId: string) => {
    "use server";
    const cartId = cookies().get("cartId")?.value as string;
    if (!cartId) return;
    await deleteCartItem(cartId, cartItemId);
  };

  const removeCartNotification = async () => {
    "use server";
    const user: User = JSON.parse(cookies().get("user")?.value as string);
    const cartId = cookies().get("cartId")?.value as string;
    if (!user || !cartId) return;
    const notificationPayload: Notification = {
      message: "You deleted your cart",
      sender: user.email,
      title: "Cart Deleted",
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      userImage: user.avatarUrl as string,
    };
    return addUserNotification(notificationPayload);
  };

  return (
    <div className="flex min-h-screen flex-col p-4 md:p-16">
      {cart && cart.items.length > 0 && cartId ? (
        <div>
          <h1 className="text-center text-amber-600 text-3xl font-bold my-5">
            Cart with {cart.items_count} Games
          </h1>
          <CartTable
            cart={cart}
            deleteProductsCartItem={deleteProductsCartItem}
          />
          <div className="flex flex-col sm:flex-row sm:space-x-2 my-5">
            <Chip color="primary" variant="shadow" className="my-2">
              Total Price : {cart.total_price} $
            </Chip>
            <Chip color="secondary" variant="shadow" className="my-2">
              Total Price After Discount : {cart.total_price_after_discount} $
            </Chip>
          </div>
          <CartActions
            deleteProductsCart={deleteProductsCart}
            removeCartNotification={removeCartNotification}
          />
        </div>
      ) : (
        <h1 className="text-center text-amber-600 text-3xl font-bold">
          Cart is empty
        </h1>
      )}
    </div>
  );
}
