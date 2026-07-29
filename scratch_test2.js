const apiBase = "https://uaterp.gbru.in";
const apiKey = "SHOPTION_XYZ_9834SDJKS";
const apiSecret = "SHOPTION_SECRET_99ASD9A8S9D";

async function run() {
  const getHeaders = () => {
    return {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      "X-API-SECRET": apiSecret
    };
  };

  try {
    console.log("Fetching with district NAME 'Satara'...");
    const responseName = await fetch(`${apiBase}/api/method/shoption_products_multiutility.apis.near_by_dealer.get_near_by_dealers`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        state: "Maharashtra",
        district: "Satara",
        tehsil: "Karad",
        marketplace: null
      })
    });
    const dataName = await responseName.json();
    console.log("Dealers fetched count with NAME:", dataName.message?.data?.length);

    console.log("Fetching with district ID '30' and tehsil ID '293'...");
    const responseId = await fetch(`${apiBase}/api/method/shoption_products_multiutility.apis.near_by_dealer.get_near_by_dealers`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        state: "Maharashtra",
        district: "30",
        tehsil: "293",
        marketplace: null
      })
    });
    const dataId = await responseId.json();
    console.log("Dealers fetched count with ID:", dataId.message?.data?.length);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
