import bcrypt from "bcrypt";
import { defineConfig } from "cypress";
import { db } from "./prisma/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        async reseed() {
          // Rensa databasen
          await db.property.deleteMany();
          await db.user.deleteMany();

          // Skapa användare
          const hashedPassword = await bcrypt.hash("hemligt", 10);
          const user = await db.user.create({
            data: {
              email: "maklare@example.com",
              password: hashedPassword,
            },
          });

          // Skapa test-fastigheter
          await db.property.createMany({
            data: [
              {
                address: "Testvägen 1",
                price: 4900000,
                status: "Såld",
                //userId: user.id,
              },
              {
                address: "Testvägen 2",
                price: 5900000,
                status: "Ej såld",
                //userId: user.id,
              },
            ],
          });
          return null;
        },
      });
      return config;
    },
  },
});
