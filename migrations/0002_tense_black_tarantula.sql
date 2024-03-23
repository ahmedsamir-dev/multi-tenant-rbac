CREATE TABLE IF NOT EXISTS "user_roles_tenants" (
	"userId" uuid NOT NULL,
	"roleId" uuid NOT NULL,
	"tenantId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_tenants_userId_roleId_tenantId_pk" PRIMARY KEY("userId","roleId","tenantId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles_tenants" ADD CONSTRAINT "user_roles_tenants_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles_tenants" ADD CONSTRAINT "user_roles_tenants_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles_tenants" ADD CONSTRAINT "user_roles_tenants_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
