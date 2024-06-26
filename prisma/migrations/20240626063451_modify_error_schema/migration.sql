/*
  Warnings:

  - You are about to drop the column `message_id` on the `users_model` table. All the data in the column will be lost.
  - Made the column `author_id` on table `comments_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_id` on table `comments_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chat_id` on table `messages_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author_id` on table `messages_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `follower_id` on table `user_followers_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followee_id` on table `user_followers_model` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments_model" ALTER COLUMN "author_id" SET NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "messages_model" ALTER COLUMN "chat_id" SET NOT NULL,
ALTER COLUMN "author_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_followers_model" ALTER COLUMN "follower_id" SET NOT NULL,
ALTER COLUMN "followee_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users_model" DROP COLUMN "message_id";
