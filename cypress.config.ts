import { defineConfig } from "cypress";
import { db } from "./prisma/db";
import bcrypt from "bcrypt";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        async reseed() {
          await db.user.deleteMany();

          const hashedPassword = await bcrypt.hash("hemligt", 10);
          await db.user.create({
            data: {
              email: "maklare@example.com",
              password: hashedPassword,
            },
          });

          return null;
        },
      });

      return config;
    },
  },
});
