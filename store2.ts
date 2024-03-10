import { create } from "zustand";
import { Notification } from "./models/notification";

export const useCartStore = create<{
  totalCartItems: number;
  totalCartPrice: number;
  totalCartPriceAfterDiscount: number;
}>((set) => ({
  totalCartItems: 0,
  totalCartPrice: 0,
  totalCartPriceAfterDiscount: 0,
}));

export const useNotificationStore = create<{
  navbarNotifications: Notification[];
  navbarNotificationsCount: number;
}>((set) => ({
  navbarNotifications: [],
  navbarNotificationsCount: 0,
}));
