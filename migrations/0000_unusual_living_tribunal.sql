CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"mobileNumber" integer,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"designation" varchar(255),
	"user_type" varchar(255) DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
