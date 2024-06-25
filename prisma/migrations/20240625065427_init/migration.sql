-- CreateEnum
CREATE TYPE "UsersModelRoleEnum" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "chats_model" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_2aea6cf9923f6b48da28709c9df" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments_model" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" VARCHAR NOT NULL,
    "like_count" INTEGER NOT NULL,
    "author_id" INTEGER,
    "post_id" INTEGER,

    CONSTRAINT "PK_0da0a249f71e90b4948e21d4bc4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_model" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "post_id" INTEGER,

    CONSTRAINT "PK_05aa8703890985ec0bb38428699" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_model" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" VARCHAR NOT NULL,
    "chat_id" INTEGER,
    "author_id" INTEGER,

    CONSTRAINT "PK_0f7c1e4adf172209f286cfcae2f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_model" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_d70f19613eb641c94bb122c4397" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_followers_model" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "follower_id" INTEGER,
    "followee_id" INTEGER,

    CONSTRAINT "PK_567b39f0fb420f63ef11095f474" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_model" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "UsersModelRoleEnum" NOT NULL DEFAULT 'USER',
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_id" INTEGER,
    "follower_count" INTEGER NOT NULL DEFAULT 0,
    "followee_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_1355f66d5ebddb2449c566571c8" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_chats_model" (
    "users_model_id" INTEGER NOT NULL,
    "chats_model_id" INTEGER NOT NULL,

    CONSTRAINT "PK_5bb92fb95e42ac2b6b778ce87dc" PRIMARY KEY ("users_model_id","chats_model_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_cf2c74837f74a2d823d330293a4" ON "users_model"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_d3129562d6ac1c574e5e909e4ed" ON "users_model"("email");

-- CreateIndex
CREATE INDEX "IDX_6d8216f552d980bdaa2bae7e93" ON "users_chats_model"("users_model_id");

-- CreateIndex
CREATE INDEX "IDX_81161993d9b420943ac1c49452" ON "users_chats_model"("chats_model_id");

-- AddForeignKey
ALTER TABLE "comments_model" ADD CONSTRAINT "FK_26a4df66c84022300d49a4c7c8e" FOREIGN KEY ("author_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_model" ADD CONSTRAINT "FK_30172445adc82b4acfa72e162ee" FOREIGN KEY ("post_id") REFERENCES "posts_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_model" ADD CONSTRAINT "FK_40cd89c6655ec7b102842feacab" FOREIGN KEY ("post_id") REFERENCES "posts_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_model" ADD CONSTRAINT "FK_65a138da666c7f41f44c7c22206" FOREIGN KEY ("author_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_model" ADD CONSTRAINT "FK_ea3803c31ed7eccb4aca9416504" FOREIGN KEY ("chat_id") REFERENCES "chats_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_model" ADD CONSTRAINT "FK_c8b7f084ae29a7104846f1bec05" FOREIGN KEY ("authorId") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_followers_model" ADD CONSTRAINT "FK_7c12be097b786317829ba012ba0" FOREIGN KEY ("followee_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_followers_model" ADD CONSTRAINT "FK_dccf79aa2a78b614aae3401eef2" FOREIGN KEY ("follower_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_chats_model" ADD CONSTRAINT "FK_6d8216f552d980bdaa2bae7e93d" FOREIGN KEY ("users_model_id") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_chats_model" ADD CONSTRAINT "FK_81161993d9b420943ac1c494525" FOREIGN KEY ("chats_model_id") REFERENCES "chats_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;
