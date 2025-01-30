export default function getStoredData(key) {
  const storedData = JSON.parse(localStorage.getItem(key));

  // setTimeout:Ensuring storedData isn't null the second pass in Strict Mode
  if (storedData) {
    setTimeout(() => localStorage.removeItem(key), 0);
  }

  return storedData;
}