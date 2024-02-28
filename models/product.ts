export interface Product {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  description: string;
  inventory: number;
  price: number;
  collection_id: number;
  external_args: any;
  background_image?: string;
  tags?: string[];
  promotions?: { discount: number; expire_at: string }[];
}