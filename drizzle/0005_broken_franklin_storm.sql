CREATE TABLE "knowledge_evaluation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"level" varchar(7) DEFAULT NULL
);
--> statement-breakpoint
ALTER TABLE "knowledge_evaluation" ADD CONSTRAINT "knowledge_evaluation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;