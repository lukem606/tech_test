import { avg, count, sql, sum } from "drizzle-orm";
import express, {
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { db } from "./db/database.js";
import { games } from "./db/schema.js";
import { Player } from "./enums.js";

interface CreateGameRequestBody {
  winner: Player;
  durationSecs: number;
  totalMoves: number;
  boardSize: number;
}

const postGamesHandler: RequestHandler = async (
  req: Request<{}, {}, CreateGameRequestBody>,
  res: Response,
) => {
  const { winner, durationSecs, totalMoves, boardSize } = req.body;

  try {
    await db.insert(games).values({
      winner,
      durationSecs,
      totalMoves,
      boardSize,
    });

    res.json({ status: 201, message: "Game created successfully." });
  } catch (error) {
    console.error("Failed to create game", error);
    res.json({
      status: 500,
      message: "Failed to create game",
      error: getErrorDetails(error),
    });
  }
};

const getGamesStatsHandler: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await db
      .select({
        totalGames: count(games.id),
        totalPlayTimeSecs: sum(games.durationSecs),
        averageGameTimeSecs: avg(games.durationSecs),
        averageMovesToWin: avg(games.totalMoves),
        totalWinsX: sql<string>`count(*) filter (where ${games.winner} = ${Player.X})`,
        totalWinsO: sql<string>`count(*) filter (where ${games.winner} = ${Player.O})`,
      })
      .from(games);

    if (!data || !data[0]) {
      throw new Error("No data avilable");
    }

    res.json({
      status: 200,
      data: formatGameStatsData(data[0]),
      message: "Game stats retrieved successfully.",
    });
  } catch (error) {
    console.error("Failed to get game stats", error);
    res.json({
      status: 500,
      message: "Failed to get game stats",
      error: getErrorDetails(error),
    });
  }
};

const formatGameStatsData = ({
  totalGames,
  totalPlayTimeSecs,
  averageGameTimeSecs,
  averageMovesToWin,
  totalWinsX,
  totalWinsO,
}: {
  totalGames: number;
  totalPlayTimeSecs: string | null;
  averageGameTimeSecs: string | null;
  averageMovesToWin: string | null;
  totalWinsX: string;
  totalWinsO: string;
}) => {
  return {
    totalGames,
    totalPlayTimeSecs: totalPlayTimeSecs
      ? Number.parseInt(totalPlayTimeSecs)
      : 0,
    averageGameTimeSecs: averageGameTimeSecs
      ? Number.parseFloat(averageGameTimeSecs)
      : 0,
    averageMovesToWin: averageMovesToWin
      ? Number.parseFloat(averageMovesToWin)
      : 0,
    totalWinsX: Number.parseInt(totalWinsX),
    totalWinsO: Number.parseInt(totalWinsO),
  };
};

const getErrorDetails = (error: unknown) => {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack };
  }

  return { message: "Unknown error", stack: undefined };
};

const gamesRouter = express.Router();
gamesRouter.post("/games", postGamesHandler);
gamesRouter.get("/games/stats", getGamesStatsHandler);

export default gamesRouter;
