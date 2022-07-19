/*
  Warnings:

  - The primary key for the `userfavorite` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `userfavorite` DROP PRIMARY KEY,
    MODIFY `exo_Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`UID`, `exo_Id`);
