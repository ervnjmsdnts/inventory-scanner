import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Scanner from '../components/Scanner'

const ScanPage = () => {
  const [scanning, setScanning] = useState(false)

  const navigate = useNavigate()

  const scan = () => {
    setScanning(!scanning)
  }

  const onDetected = result => {
    setScanning(false)
    navigate(`/add-product/${result?.codeResult?.code}`)
  }

  return (
    <Box>
      <Button variant="contained" onClick={scan}>
        {scanning ? 'Stop' : 'Start'}
      </Button>

      {scanning ? <Scanner onDetected={onDetected} /> : null}
    </Box>
  )
}

export default ScanPage
