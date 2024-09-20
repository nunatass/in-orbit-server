CREATE TABLE IF NOT EXISTS "goals_completions" (
	"id" text PRIMARY KEY NOT NULL,
	"global_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals_completions" ADD CONSTRAINT "goals_completions_global_id_goals_id_fk" FOREIGN KEY ("global_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
