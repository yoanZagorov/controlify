import { ROUTES } from '#constants'

// Since fetchers don't automatically reset their data after a submission, reset it manually
export default function resetFetcher(fetcher) {
  if (fetcher.state === 'idle' && fetcher.data) {
    fetcher.submit({}, { action: ROUTES.RESET_FETCHER, method: 'post' })
  }
}
