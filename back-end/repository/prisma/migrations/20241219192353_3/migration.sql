-- DropForeignKey
ALTER TABLE "GamesInLibraries" DROP CONSTRAINT "GamesInLibraries_gameId_fkey";

-- AddForeignKey
ALTER TABLE "GamesInLibraries" ADD CONSTRAINT "GamesInLibraries_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
