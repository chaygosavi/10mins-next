CREATE TABLE IF NOT EXISTS "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(6) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pincode_idx" ON "warehouses" USING btree ("name");