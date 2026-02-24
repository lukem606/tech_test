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
      <div className="flex flex-col gap-5">
        <StatisticsRow label="Total games played" value={gameStats.totalGames} />
        <StatisticsRow label="Total playing time" value={gameStats.totalPlayTimeSecs} />
        <StatisticsRow
          label="Average game time"
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
    <div className="flex flex-col items-center">
      <span className="font-bold text-2xl">Stats</span>
      {renderContent()}
    </div>
  );
};
