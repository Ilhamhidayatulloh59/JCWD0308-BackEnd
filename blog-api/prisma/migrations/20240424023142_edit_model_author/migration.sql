-- AlterTable
ALTER TABLE `Author` ADD COLUMN `isSuspend` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` LONGTEXT NULL;
