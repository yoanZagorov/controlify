export default async function fetchCurrencyRates(baseCurrency) {
  const URL = `https://v6.exchangerate-api.com/v6/c9d6d9fb221d6baf099f9d4e/latest/${baseCurrency.code}`;

  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    if (data.result === "error") {
      throw new Error(`API Error: ${data["error-type"]}`);
    }

    return data.conversion_rates;
  } catch (error) {
    throw new Error("Error fetching currency rates", { cause: error });
  }
}