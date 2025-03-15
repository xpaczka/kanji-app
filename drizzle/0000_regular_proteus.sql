CREATE TABLE "kanji" (
	"id" uuid PRIMARY KEY NOT NULL,
	"kanji" varchar(1) NOT NULL,
	"level" varchar(7) NOT NULL,
	"meanings" text[] NOT NULL,
	"kun_readings" text[] NOT NULL,
	"on_readings" text[],
	CONSTRAINT "kanji_kanji_unique" UNIQUE("kanji")
);
