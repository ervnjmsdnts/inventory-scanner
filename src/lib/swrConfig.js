import fetcher from './fetcher'

const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateIfStale: false,
  revalidateOnReconnect: false
}

export default swrConfig
