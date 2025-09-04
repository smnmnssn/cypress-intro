import { db } from "../db";
import { seedClients } from "./clients";
import { seedProperties } from "./properties";

async function main() {
  await seedClients();
  await seedProperties();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
