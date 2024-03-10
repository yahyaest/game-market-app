"use client";

import { useRef } from "react";
import { useCartStore, useNotificationStore } from "@/zustandStore";
import { Notification } from "../models/notification";

export function CartStoreInitializer({
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

export function NotificationStoreInitializer({
  navbarNotifications,
  navbarNotificationsCount,
}: {
  navbarNotifications: Notification[];
  navbarNotificationsCount: number;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useNotificationStore.setState({
      navbarNotifications,
      navbarNotificationsCount,
    });
    initialized.current = true;
  }
  return null;
}
