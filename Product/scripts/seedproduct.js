const pool = require("../db");

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home"
];

async function seed() {
  const batchSize = 5000;
  const total = 200000;

  console.log("Seeding started...");

  for (let i = 0; i < total; i += batchSize) {

    const values = [];

    for (let j = 0; j < batchSize; j++) {

      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      );

      values.push([
        `Product ${i + j + 1}`,
        categories[Math.floor(Math.random() * categories.length)],
        (Math.random() * 10000).toFixed(2),
        randomDate,
        randomDate
      ]);
    }

    await pool.query(
      `INSERT INTO products
      (name, category, price, created_at, updated_at)
      VALUES ?`,
      [values]
    );

    console.log(`Inserted ${i + batchSize}`);
  }

  console.log("Done");
  process.exit();
}

seed();