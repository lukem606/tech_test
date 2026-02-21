CREATE TABLE games (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "winner" VARCHAR(1) NOT NULL,
    "duration" INTEGER NOT NULL,
    "totalMoves" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME);