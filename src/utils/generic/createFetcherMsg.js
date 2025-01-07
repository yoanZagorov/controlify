export default function createFetcherMsg(fetcher) {
  const msg = fetcher.data?.msg;
  const msgType = fetcher.data?.msgType;

  return [msg, msgType];
}