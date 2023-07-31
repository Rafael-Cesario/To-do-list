-- CreateTable
CREATE TABLE "lists" (
    "listID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("listID")
);

-- CreateTable
CREATE TABLE "subjects" (
    "listID" TEXT NOT NULL,
    "subjectID" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("subjectID")
);

-- CreateIndex
CREATE UNIQUE INDEX "lists_name_key" ON "lists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_listID_fkey" FOREIGN KEY ("listID") REFERENCES "lists"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;
