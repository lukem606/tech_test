import React from 'react';
import { GameStats } from '../types';
import { StatisticsRow } from './StatisticsRow';
import { Line } from './Line';

interface StatisticsProps {
  gameStats: GameStats | undefined;
}

export const Statistics = ({ gameStats }: StatisticsProps) => {
  const renderContent = () => {
    if (!gameStats) {
      return (
        <div className="flex flex-col gap-2 px-5 py-2 rounded-md bg-white text-black">
          <div>{'No data :('}</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 px-5 py-2 rounded-md bg-white text-black">
        <StatisticsRow label="Total games played" value={gameStats.totalGames} />
        <Line />
        <StatisticsRow label="Total playing time (secs)" value={gameStats.totalPlayTimeSecs} />
        <Line />
        <StatisticsRow
          label="Average game time (secs)"
          value={Math.floor(gameStats.averageGameTimeSecs)}
        />
        <Line />
        <StatisticsRow
          label="Average moves to win"
          value={Math.floor(gameStats.averageMovesToWin)}
        />
        <Line />
        <StatisticsRow label="Total wins for X" value={gameStats.totalWinsX} />
        <Line />
        <StatisticsRow label="Total wins for O" value={gameStats.totalWinsO} />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <span className="font-bold text-2xl mb-5">Stats</span>
      {renderContent()}
    </div>
  );
};
