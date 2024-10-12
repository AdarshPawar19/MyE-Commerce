ALTER TABLE "users" RENAME TO "customer";--> statement-breakpoint
ALTER TABLE "customer" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "password" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_email_unique" UNIQUE("email");