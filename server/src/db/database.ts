import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const db = drizzle(process.env.DATABASE_URL!);

const runMigrations = async () => {
  console.log("Running migrations");
  await migrate(db, { migrationsFolder: "./drizzle" });
};

runMigrations();
