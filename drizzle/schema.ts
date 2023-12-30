import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
  unique,
  json,
  real,
} from "drizzle-orm/pg-core";

export const roleyEnum = pgEnum("role", ["ADMIN", "USER"]);
export const authProviderEnum = pgEnum("authProvider", [
  "GOOGLE",
  "FACEBOOK",
  "GITHUB",
]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    phone: integer("phone"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt"),
    role: roleyEnum("role").notNull().default("USER"),
    avatarUrl: text("avatarUrl"),
    authProvider: authProviderEnum("authProvider"),
  },
  (user) => ({
    unique: unique().on(user.email, user.authProvider),
  })
);

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt"),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  metacritic: integer("metacritic"),
  released: text("released"),
  background_image: text("background_image"),
  background_image_additional: text("background_image_additional"),
  screenshots: json("screenshots"),
  website: text("website"),
  rating: real("rating"),
  ratings_count: integer("ratings_count"),
  platforms: json("platforms"),
  stores: json("stores"),
  trailers: json("trailers"),
  developers: json("developers"),
  genres: json("genres"),
  tags: json("tags"),
  publishers: json("publishers"),
});
