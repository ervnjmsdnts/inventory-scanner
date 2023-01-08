import { useState } from 'react'
import Scanner from '../components/Scanner'

const ScanPage = () => {
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState('Not Found')

  const scan = () => {
    setScanning(!scanning)
  }

  const onDetected = result => {
    setResults(result)
    setScanning(false)
  }

  console.log({ results })

  return (
    <div>
      <button onClick={scan}>{scanning ? 'Stop' : 'Start'}</button>
      <h1>Results: {results?.codeResult?.code}</h1>

      {scanning ? <Scanner onDetected={onDetected} /> : null}
    </div>
  )
}

export default ScanPage
