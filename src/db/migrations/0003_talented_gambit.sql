ALTER TABLE "parts" ALTER COLUMN "price" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "work_types" ALTER COLUMN "price" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "work_types" ALTER COLUMN "category_id" SET NOT NULL;