-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
