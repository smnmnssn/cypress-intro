import { db } from "../db";

export async function seedClients() {
  await db.client.deleteMany();

  await db.client.createMany({
    data: [

      {
        name: "Johan Johansson",
        email: "johan@example.com",
        address: "Parkvägen 3",
      },
      {
        name: "Lisa Larsson",
        email: "lisa@example.com",
        address: "Villagatan 12",
      },
      { name: "Per Persson", email: "per@example.com", address: "Kyrkvägen 5" },
      {
        name: "Maria Svensson",
        email: "maria@example.com",
        address: "Bäckvägen 7",
      },
      {
        name: "Erik Nilsson",
        email: "erik@example.com",
        address: "Ängsvägen 2",
      },
      {
        name: "Karin Holm",
        email: "karin@example.com",
        address: "Blomstervägen 9",
      },
      {
        name: "Anders Lind",
        email: "anders@example.com",
        address: "Skogsvägen 14",
      },
      { name: "Emma Berg", email: "emma@example.com", address: "Lindvägen 8" },
      {
        name: "Oskar Dahl",
        email: "oskar@example.com",
        address: "Havsutsiktsvägen 5",
      },
      {
        name: "Sofia Ek",
        email: "sofia@example.com",
        address: "Södra Allén 11",
      },
    ],
  });
}
