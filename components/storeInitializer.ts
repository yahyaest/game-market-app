"use client";

import { useCartStore } from "@/store2";
import { useRef } from "react";

function StoreInitializer({
  totalCartItems,
  totalCartPrice,
  totalCartPriceAfterDiscount,
}: {
  totalCartItems: number;
  totalCartPrice: number;
  totalCartPriceAfterDiscount: number;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useCartStore.setState({
      totalCartItems,
      totalCartPrice,
      totalCartPriceAfterDiscount,
    });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
