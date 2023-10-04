-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "listID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjectsLength" INTEGER NOT NULL DEFAULT 0,
    "userID" TEXT NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("listID")
);

-- CreateTable
CREATE TABLE "subjects" (
    "subjectID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "listID" TEXT NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("subjectID")
);

-- CreateTable
CREATE TABLE "tags" (
    "tagID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tagID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tags_userID_key" ON "tags"("userID");

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_listID_fkey" FOREIGN KEY ("listID") REFERENCES "lists"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
