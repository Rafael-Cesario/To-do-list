/*
  Warnings:

  - You are about to drop the column `taskId` on the `tags` table. All the data in the column will be lost.
  - Added the required column `taskID` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_taskId_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "taskId",
ADD COLUMN     "taskID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
