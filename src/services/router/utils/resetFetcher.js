export default function resetFetcher(fetcher) {
  console.log("resetFetcher")
  if (fetcher.state === "idle" && fetcher.data) {
    fetcher.submit({}, { action: "/data/reset-fetcher", method: "post" });
  }
}