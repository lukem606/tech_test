import React, { FC, useEffect, useState } from 'react';
import { getGameStats } from '../api/getGameStats';
import { GameStats } from '../types';
import { StatisticsRow } from './StatisticsRow';

export const Statistics = () => {
  const [gameStatsData, setGameStatsData] = useState<GameStats | undefined>();

  useEffect(() => {
    const getGameStatsData = async () => {
      try {
        const data = await getGameStats();
        setGameStatsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGameStatsData();
  }, []);

  if (gameStatsData) {
    return (
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">Game statistics</span>
        <div className="flex flex-col gap-5">
          <StatisticsRow label="Total games played" value={gameStatsData.totalGames} />
          <StatisticsRow label="Total playing time" value={gameStatsData.totalPlayTimeSecs} />
          <StatisticsRow label="Average game time" value={gameStatsData.averageGameTimeSecs} />
          <StatisticsRow label="Average moves to win" value={gameStatsData.averageMovesToWin} />
          <StatisticsRow label="Total wins for X" value={gameStatsData.totalWinsX} />
          <StatisticsRow label="Total wins for O" value={gameStatsData.totalWinsO} />
        </div>
      </div>
    );
  }
};
