export interface Review {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  username?: string;
  email?: string;
  customer_name?: string;
  customer_email?: string;
  comment: string;
  rating: number;
  gameId?: number
  productId?: number
}
