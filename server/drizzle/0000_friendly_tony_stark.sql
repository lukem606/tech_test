CREATE TABLE IF NOT EXISTS "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"winner" varchar(1) NOT NULL,
	"duration_secs" integer NOT NULL,
	"total_moves" integer NOT NULL,
	"board_size" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
