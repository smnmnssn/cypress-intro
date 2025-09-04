import { db } from "../db";

export async function seedProperties() {
  await db.property.deleteMany();

  await db.property.createMany({
    data: [
      { address: "Testgatan 1", price: 3500000, status: "Till salu" },
      { address: "Villavägen 2", price: 4900000, status: "Såld" },
      { address: "Solrosvägen 4", price: 2750000, status: "Till salu" },
      { address: "Björkvägen 7", price: 6100000, status: "Såld" },
      { address: "Åkervägen 10", price: 4200000, status: "Till salu" },
      { address: "Strandvägen 15", price: 7800000, status: "Såld" },
      { address: "Ekvägen 6", price: 3100000, status: "Till salu" },
      { address: "Tallstigen 9", price: 5600000, status: "Till salu" },
      { address: "Kullavägen 12", price: 3300000, status: "Såld" },
      { address: "Blåbärsvägen 3", price: 2400000, status: "Till salu" },
      { address: "Ringvägen 18", price: 6900000, status: "Såld" },
    ],
  });
}
