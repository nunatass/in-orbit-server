ALTER TABLE "goals_completions" DROP CONSTRAINT "goals_completions_global_id_goals_id_fk";
--> statement-breakpoint
ALTER TABLE "goals_completions" ADD COLUMN "goal_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals_completions" ADD CONSTRAINT "goals_completions_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "goals_completions" DROP COLUMN IF EXISTS "global_id";