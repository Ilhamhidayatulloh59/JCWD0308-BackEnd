/*
  Warnings:

  - Made the column `password` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Author` MODIFY `password` LONGTEXT NOT NULL;
