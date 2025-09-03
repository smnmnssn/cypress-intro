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

          return null;
        },
      });
      return config;
    },
  },
});
