import { z } from 'zod';

import { SERVER_URL } from './api';
import { Player } from '../enums';
import { XorO } from '../types';

interface PostGameProps {
  winner: XorO;
  durationSecs?: number;
  totalMoves?: number;
}

const postGameResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export const postGame = async ({ winner, durationSecs = 300, totalMoves = 10 }: PostGameProps) => {
  try {
    const response = await fetch(`${SERVER_URL}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winner, durationSecs, totalMoves }),
    });

    const json = await response.json();
    const parseResult = postGameResponseSchema.safeParse(json);
    if (parseResult.success) return parseResult.data;
    if (parseResult.error) throw new Error('Failed to get game stats');
  } catch (error) {
    console.error('Failed to get game stats');
  }
};
