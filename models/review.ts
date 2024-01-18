export interface Review {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  username?: string;
  email?: string;
  userImage?:string;
  customer_name?: string;
  customer_email?: string;
  customer_image?: string;
  comment: string;
  rating: number;
  gameId?: number
  productId?: number
}
