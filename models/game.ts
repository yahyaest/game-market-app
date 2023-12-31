export interface Game {
  id: number;
  updatedAt: string;
  createdAt: string;
  title: string;
  slug: string;
  description: string;
  metacritic: number;
  released: string;
  background_image: string;
  background_image_additional: string;
  screenshots: string[];
  website: string;
  rating: number;
  ratings_count: number;
  platforms: string[];
  stores: { name: string; url: string }[];
  trailers: {
    name: string;
    preview: string;
    data: { 480: string; max: string };
  }[];
  developers: string[];
  genres: string[];
  tags: string[];
  publishers: string[];
}
