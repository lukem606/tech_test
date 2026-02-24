import { z } from 'zod';

import { SERVER_URL } from './api';

const getGameStatsResponseSchema = z.object({
  data: z.object({
    totalGames: z.number(),
    totalPlayTimeSecs: z.number(),
    averageGameTimeSecs: z.number(),
    averageMovesToWin: z.number(),
    totalWinsX: z.number(),
    totalWinsO: z.number(),
  }),
  status: z.number(),
  message: z.string(),
});

export const getGameStats = async () => {
  try {
    const data = await fetch(`${SERVER_URL}/games/stats`);
    const json = await data.json();

    const parseResult = getGameStatsResponseSchema.safeParse(json);

    console.log(json);
    console.log(parseResult);
    if (parseResult.success) return parseResult.data.data;
    if (parseResult.error) throw new Error('Failed to get game stats');
  } catch (error) {
    console.error('Failed to get game stats');
  }
};
