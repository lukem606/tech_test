export type Game = {
  id: number;
  winner: Player;
  duration: number;
  totalMoves: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type Player = "X" | "O";
