import React from 'react';
import { GameStats } from '../types';
import { StatisticsRow } from './StatisticsRow';

interface StatisticsProps {
  gameStats: GameStats | undefined;
}

export const Statistics = ({ gameStats }: StatisticsProps) => {
  const renderContent = () => {
    if (!gameStats) {
      return <div>No data</div>;
    }
    return (
      <div className="flex flex-col gap-5 w-96">
        <StatisticsRow label="Total games played" value={gameStats.totalGames} />
        <StatisticsRow label="Total playing time (secs)" value={gameStats.totalPlayTimeSecs} />
        <StatisticsRow
          label="Average game time (secs)"
          value={Math.floor(gameStats.averageGameTimeSecs)}
        />
        <StatisticsRow
          label="Average moves to win"
          value={Math.floor(gameStats.averageMovesToWin)}
        />
        <StatisticsRow label="Total wins for X" value={gameStats.totalWinsX} />
        <StatisticsRow label="Total wins for O" value={gameStats.totalWinsO} />
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <span className="font-bold text-2xl mb-5">Stats</span>
      {renderContent()}
    </div>
  );
};
