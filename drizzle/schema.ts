import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
  unique,
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
