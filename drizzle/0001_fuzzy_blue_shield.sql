CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
