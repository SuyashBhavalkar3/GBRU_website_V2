const queries = [
  "Haveli, Maharashtra, 411046",
  "Haveli, Pune, Maharashtra"
];

async function run() {
  for (const q of queries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "GBRU-Dealer-Finder/1.0"
        }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        console.log(`Query: "${q}"`);
        console.log(`Resolved: [${data[0].lat}, ${data[0].lon}]`);
        console.log(`Display Name: "${data[0].display_name}"`);
        console.log("-----------------------------------------");
      } else {
        console.log(`Query: "${q}" -> NO RESULTS`);
        console.log("-----------------------------------------");
      }
    } catch (err) {
      console.error(err);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}

run();
