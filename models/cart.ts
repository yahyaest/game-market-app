import { Product } from "./product";

export interface CartItem {
  id?: string;
  created_at?: Date;
  product: Product;
  quantity: number;
  total_price: number;
  total_price_after_discount: number;
}

export interface Cart {
  id?: string;
  created_at?: Date;
  last_update?: Date;
  items: CartItem[];
  total_price: number;
  total_price_after_discount: number;
  items_count: number;
}
