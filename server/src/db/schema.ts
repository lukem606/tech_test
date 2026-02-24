import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const gamesTable = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  winner: varchar("winner", { length: 1 }).notNull(),
  durationSecs: integer("duration_secs").notNull(),
  totalMoves: integer("total_moves").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
