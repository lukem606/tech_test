import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const db = drizzle(
  process.env.DATABASE_URL ?? "postgres://user:password@db:5432/database",
);

const runMigrations = async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
};

runMigrations().catch((error: unknown) => {
  console.error("An error occurred while running database migrations", error);
});
