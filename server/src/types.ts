export type CreateGameDto = Pick<
  Game,
  "winner" | "durationSecs" | "totalMoves"
>;

export type Game = {
  id: number;
  winner: Player;
  durationSecs: number;
  totalMoves: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type Player = "X" | "O";
