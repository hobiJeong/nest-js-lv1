-- CreateEnum
CREATE TYPE "users_model_role_enum" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "chats_model" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_2aea6cf9923f6b48da28709c9df" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments_model" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" VARCHAR NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "authorId" INTEGER,
    "postId" INTEGER,

    CONSTRAINT "PK_0da0a249f71e90b4948e21d4bc4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_model" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "postId" INTEGER,

    CONSTRAINT "PK_05aa8703890985ec0bb38428699" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_model" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" VARCHAR NOT NULL,
    "chatId" INTEGER,
    "authorId" INTEGER,

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
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "followerId" INTEGER,
    "followeeId" INTEGER,

    CONSTRAINT "PK_567b39f0fb420f63ef11095f474" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_model" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "users_model_role_enum" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messagesId" INTEGER,
    "followerCount" INTEGER NOT NULL DEFAULT 0,
    "followeeCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_1355f66d5ebddb2449c566571c8" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_model_chats_chats_model" (
    "usersModelId" INTEGER NOT NULL,
    "chatsModelId" INTEGER NOT NULL,

    CONSTRAINT "PK_5bb92fb95e42ac2b6b778ce87dc" PRIMARY KEY ("usersModelId","chatsModelId")
);

-- CreateTable
CREATE TABLE "users_model_followers_users_model" (
    "usersModelId_1" INTEGER NOT NULL,
    "usersModelId_2" INTEGER NOT NULL,

    CONSTRAINT "PK_b077d1c8b72a4c0ce4e42f800a2" PRIMARY KEY ("usersModelId_1","usersModelId_2")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_cf2c74837f74a2d823d330293a4" ON "users_model"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_d3129562d6ac1c574e5e909e4ed" ON "users_model"("email");

-- CreateIndex
CREATE INDEX "IDX_6d8216f552d980bdaa2bae7e93" ON "users_model_chats_chats_model"("usersModelId");

-- CreateIndex
CREATE INDEX "IDX_81161993d9b420943ac1c49452" ON "users_model_chats_chats_model"("chatsModelId");

-- CreateIndex
CREATE INDEX "IDX_2800f7786f0018c884ddc9aad3" ON "users_model_followers_users_model"("usersModelId_1");

-- CreateIndex
CREATE INDEX "IDX_2b73b5ccf99c1596cc181704fb" ON "users_model_followers_users_model"("usersModelId_2");

-- AddForeignKey
ALTER TABLE "comments_model" ADD CONSTRAINT "FK_26a4df66c84022300d49a4c7c8e" FOREIGN KEY ("authorId") REFERENCES "users_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments_model" ADD CONSTRAINT "FK_30172445adc82b4acfa72e162ee" FOREIGN KEY ("postId") REFERENCES "posts_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "image_model" ADD CONSTRAINT "FK_40cd89c6655ec7b102842feacab" FOREIGN KEY ("postId") REFERENCES "posts_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_model" ADD CONSTRAINT "FK_65a138da666c7f41f44c7c22206" FOREIGN KEY ("authorId") REFERENCES "users_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages_model" ADD CONSTRAINT "FK_ea3803c31ed7eccb4aca9416504" FOREIGN KEY ("chatId") REFERENCES "chats_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_model" ADD CONSTRAINT "FK_c8b7f084ae29a7104846f1bec05" FOREIGN KEY ("authorId") REFERENCES "users_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_followers_model" ADD CONSTRAINT "FK_7c12be097b786317829ba012ba0" FOREIGN KEY ("followeeId") REFERENCES "users_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_followers_model" ADD CONSTRAINT "FK_dccf79aa2a78b614aae3401eef2" FOREIGN KEY ("followerId") REFERENCES "users_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_model" ADD CONSTRAINT "FK_af4b8711587abc83cda296fbacc" FOREIGN KEY ("messagesId") REFERENCES "messages_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_model_chats_chats_model" ADD CONSTRAINT "FK_6d8216f552d980bdaa2bae7e93d" FOREIGN KEY ("usersModelId") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_model_chats_chats_model" ADD CONSTRAINT "FK_81161993d9b420943ac1c494525" FOREIGN KEY ("chatsModelId") REFERENCES "chats_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_model_followers_users_model" ADD CONSTRAINT "FK_2800f7786f0018c884ddc9aad3e" FOREIGN KEY ("usersModelId_1") REFERENCES "users_model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_model_followers_users_model" ADD CONSTRAINT "FK_2b73b5ccf99c1596cc181704fbe" FOREIGN KEY ("usersModelId_2") REFERENCES "users_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

