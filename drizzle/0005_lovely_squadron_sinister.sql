DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('Finshed', 'Planned', 'Playing', 'Dropped');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favourite_games" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"status" "status" NOT NULL,
	"gameId" integer,
	CONSTRAINT "favourite_games_email_gameId_unique" UNIQUE("email","gameId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourite_games" ADD CONSTRAINT "favourite_games_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
