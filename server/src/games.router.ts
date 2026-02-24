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
}

const postGamesHandler: RequestHandler = async (
  req: Request<{}, {}, CreateGameRequestBody>,
  res: Response,
) => {
  const { winner, durationSecs, totalMoves } = req.body;

  try {
    await db.insert(games).values({
      winner,
      durationSecs,
      totalMoves,
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
        totalWinsX: sql<number>`count(*) filter (where ${games.winner} = ${Player.X})`,
        totalWinsO: sql<number>`count(*) filter (where ${games.winner} = ${Player.O})`,
      })
      .from(games);

    res.json({
      status: 200,
      data,
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
