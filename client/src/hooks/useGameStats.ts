import { useEffect, useState } from 'react';
import { getGameStats } from '../api/getGameStats';
import { GameStats } from '../types';

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState<GameStats | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const refetch = async (): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      const data = await getGameStats();

      if (!data) {
        throw new Error('No game stats returned');
      }

      setGameStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch game stats');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refetch();
  }, []);

  return { gameStats, isLoading, error, refetch };
};
