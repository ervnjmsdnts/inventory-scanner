import client from './client'

const fetcher = async url => client.get(url).then(response => response.data)

export default fetcher
