/*
  Warnings:

  - You are about to drop the column `subjectID` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_subjectID_fkey";

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "subjectID",
ADD COLUMN     "userID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tags_userID_key" ON "tags"("userID");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
