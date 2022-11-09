import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
