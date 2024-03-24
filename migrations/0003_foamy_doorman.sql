ALTER TABLE "tenants" DROP CONSTRAINT "tenants_createdByUserId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" DROP COLUMN IF EXISTS "createdByUserId";