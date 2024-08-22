DROP INDEX IF EXISTS "pincode_idx";--> statement-breakpoint
ALTER TABLE "warehouses" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "pincode" varchar(6) NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pincode_idx" ON "warehouses" USING btree ("pincode");