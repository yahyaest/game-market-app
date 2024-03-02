import { create } from "zustand";

export const useCartStore = create<{
  totalCartItems: number;
  totalCartPrice: number;
  totalCartPriceAfterDiscount: number;
}>((set) => ({
  totalCartItems: 0,
  totalCartPrice: 0,
  totalCartPriceAfterDiscount: 0,
}));
