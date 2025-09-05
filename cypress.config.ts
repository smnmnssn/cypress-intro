import bcrypt from "bcrypt";
import { defineConfig } from "cypress";
import { db } from "./prisma/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        async reseed() {
          await db.user.deleteMany();
          await db.property.deleteMany();
          await db.client.deleteMany();

          const hashedPassword = await bcrypt.hash("hemligt", 10);
          await db.user.create({
            data: {
              email: "maklare@example.com",
              password: hashedPassword,
            },
          });

          await db.property.create({
            data: {
              address: "Testgatan 1",
              price: 2500000,
              status: "Till salu",
            },
          });

          await db.client.createMany({
            data: [
              {
                name: "Lisa Larsson",
                email: "lisa@example.com",
                address: "Villagatan 12",
              },
              {
                name: "Anders Nilsson",
                email: "anders@example.com",
                address: "Parkvägen 3",
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
