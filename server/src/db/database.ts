import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Game } from "../types.js";

const db = await open({
  filename: "./games.db",
  driver: sqlite3.Database,
});

export const createGame = (game: Game) => {};

export const getGames = () => {};
