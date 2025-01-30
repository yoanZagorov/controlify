export default async function getConvertedAmount(baseCurrency, targetCurrency, amount) {
  const URL = `https://v6.exchangerate-api.com/v6/c9d6d9fb221d6baf099f9d4e/pair/${baseCurrency}/${targetCurrency}/${amount}`

  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    if (data.result === "error") {
      throw new Error(`API Error: ${data["error-type"]}`);
    }

    return data.conversion_result;
  } catch (error) {
    throw new Error("Error fetching currency rates", { cause: error });
  }
}