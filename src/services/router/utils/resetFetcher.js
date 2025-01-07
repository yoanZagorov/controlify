export default function resetFetcher(fetcher) {
  if (fetcher.state === "idle" && fetcher.data) {
    fetcher.submit({}, { action: "/data/reset-fetcher", method: "post" });
  }
}