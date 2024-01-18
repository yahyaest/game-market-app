ALTER TABLE "reviews" ADD COLUMN "user_image" text;--> statement-breakpoint
ALTER TABLE "favourite_games" DROP COLUMN IF EXISTS "user_image";