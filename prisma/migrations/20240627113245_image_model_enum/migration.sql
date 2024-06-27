/*
  Warnings:

  - Changed the type of `type` on the `image_model` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('POST');

-- AlterTable
ALTER TABLE "image_model" DROP COLUMN "type",
ADD COLUMN     "type" "ImageType" NOT NULL;
