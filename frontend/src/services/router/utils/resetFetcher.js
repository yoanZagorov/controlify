// Since fetchers don't automatically reset their data after a submission, reset it manually
export default function resetFetcher(fetcher) {
  if (fetcher.state === "idle" && fetcher.data) {
    fetcher.submit({}, { action: "/data/reset-fetcher", method: "post" });
  }
}