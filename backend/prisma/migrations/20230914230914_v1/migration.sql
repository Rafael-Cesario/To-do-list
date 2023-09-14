-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_userID_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_taskID_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_listID_fkey";

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_listID_fkey" FOREIGN KEY ("listID") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
