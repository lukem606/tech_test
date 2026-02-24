import React, { FC, useEffect, useState } from 'react';
import { getGameStats } from '../api/getGameStats';
import { GameStats } from '../types';

export const LeaderBoard = () => {
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
    console.log('THERE IS GAME DATA YEH?');
    return (
      <div>
        <div>Total games played: {gameStatsData.totalGames}</div>
        <div>Total playing time: {gameStatsData.totalPlayTimeSecs}</div>
        <div>Average game time: {gameStatsData.averageGameTimeSecs}</div>
        <div>Average moves to win: {gameStatsData.averageMovesToWin}</div>
        <div>Total wins for X: {gameStatsData.totalWinsX}</div>
        <div>Total wins for O: {gameStatsData.totalWinsO}</div>
      </div>
    );
  }
};
