CREATE TABLE "user_kanji" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"kanji_id" uuid
);
--> statement-breakpoint
ALTER TABLE "user_kanji" ADD CONSTRAINT "user_kanji_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_kanji" ADD CONSTRAINT "user_kanji_kanji_id_kanji_id_fk" FOREIGN KEY ("kanji_id") REFERENCES "public"."kanji"("id") ON DELETE no action ON UPDATE no action;