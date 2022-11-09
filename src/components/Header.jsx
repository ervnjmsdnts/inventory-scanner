import { Box, Typography } from '@mui/material'

const Header = ({ title }) => {
  return (
    <Box mb="16px">
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  )
}

export default Header
