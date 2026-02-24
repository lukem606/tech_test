import React from 'react';

import { Game } from './components/Game';
import { Statistics } from './components/Statistics';
import { useGameStats } from './hooks/useGameStats';

export const Main = () => {
  const { gameStats, refetch } = useGameStats();

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <div className="min-h-screen bg-dark-green text-white p-10">
      <div className="flex flex-col items-center gap-10">
        <div className="font-bold text-2xl">Tic Tac Toe</div>

        <div className="flex flex-row gap-10">
          <Statistics gameStats={gameStats} />
          <Game onRefetch={handleRefetch}></Game>
        </div>
      </div>
    </div>
  );
};
