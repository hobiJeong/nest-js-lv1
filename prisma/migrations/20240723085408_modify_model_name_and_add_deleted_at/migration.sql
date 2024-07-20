/*
  Warnings:

  - The primary key for the `users_model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `email` on the `users_model` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - You are about to alter the column `password` on the `users_model` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(30)`.
  - The `role` column on the `users_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `chats_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_followers_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_chats_model` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "comments_model" DROP CONSTRAINT "FK_26a4df66c84022300d49a4c7c8e";

-- DropForeignKey
ALTER TABLE "comments_model" DROP CONSTRAINT "FK_30172445adc82b4acfa72e162ee";

-- DropForeignKey
ALTER TABLE "image_model" DROP CONSTRAINT "FK_40cd89c6655ec7b102842feacab";

-- DropForeignKey
ALTER TABLE "messages_model" DROP CONSTRAINT "FK_65a138da666c7f41f44c7c22206";

-- DropForeignKey
ALTER TABLE "messages_model" DROP CONSTRAINT "FK_ea3803c31ed7eccb4aca9416504";

-- DropForeignKey
ALTER TABLE "posts_model" DROP CONSTRAINT "FK_c8b7f084ae29a7104846f1bec05";

-- DropForeignKey
ALTER TABLE "user_followers_model" DROP CONSTRAINT "FK_7c12be097b786317829ba012ba0";

-- DropForeignKey
ALTER TABLE "user_followers_model" DROP CONSTRAINT "FK_dccf79aa2a78b614aae3401eef2";

-- DropForeignKey
ALTER TABLE "users_chats_model" DROP CONSTRAINT "FK_6d8216f552d980bdaa2bae7e93d";

-- DropForeignKey
ALTER TABLE "users_chats_model" DROP CONSTRAINT "FK_81161993d9b420943ac1c494525";

-- AlterTable
ALTER TABLE "users_model" DROP CONSTRAINT "PK_1355f66d5ebddb2449c566571c8",
ADD COLUMN "deletedAt" TIMESTAMPTZ(6),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
DROP COLUMN "role",
ADD COLUMN     "role" "UserRoleEnum" NOT NULL DEFAULT 'USER',
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "pk_users" PRIMARY KEY ("id");
DROP SEQUENCE "users_model_id_seq";

-- DropTable
DROP TABLE "chats_model";

-- DropTable
DROP TABLE "comments_model";

-- DropTable
DROP TABLE "image_model";

-- DropTable
DROP TABLE "messages_model";

-- DropTable
DROP TABLE "posts_model";

-- DropTable
DROP TABLE "user_followers_model";

-- DropTable
DROP TABLE "users_chats_model";

-- DropEnum
DROP TYPE "UsersModelRoleEnum";

-- CreateTable
CREATE TABLE "chat_rooms" (
    "id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_chat_rooms" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGINT NOT NULL,
    "comment" VARCHAR(255) NOT NULL,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "user_id" BIGINT NOT NULL,
    "post_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_comments" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" BIGINT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "ImageType" NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "post_id" BIGINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_images" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" BIGINT NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "chat_room_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_messages" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "userId" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_posts" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "id" BIGINT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "follower_id" BIGINT NOT NULL,
    "followee_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_follows" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_users" (
    "id" BIGINT NOT NULL,
    "users_id" BIGINT NOT NULL,
    "chats_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "pk_chat_users" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "fk_comments_users" FOREIGN KEY ("user_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "fk_comments_posts" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "fk_images_posts" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "fk_messages_users" FOREIGN KEY ("user_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "fk_messages_chat_rooms" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_users" FOREIGN KEY ("userId") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "fk_follows_users_followee" FOREIGN KEY ("followee_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "fk_follows_users_follower" FOREIGN KEY ("follower_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_users" ADD CONSTRAINT "fk_chat_users_users" FOREIGN KEY ("users_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_users" ADD CONSTRAINT "fk_chat_users_chat_rooms" FOREIGN KEY ("chats_id") REFERENCES "chat_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "UQ_cf2c74837f74a2d823d330293a4" RENAME TO "uq_users_nickname";

-- RenameIndex
ALTER INDEX "UQ_d3129562d6ac1c574e5e909e4ed" RENAME TO "uq_users_email";
