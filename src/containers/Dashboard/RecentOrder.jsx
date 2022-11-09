import { Box, Button, colors, Typography } from '@mui/material'
import { useOrder } from '../../contexts/OrderContext'

const RecentOrder = ({ createdAt, id }) => {
  const { setSelectedOrder } = useOrder()
  return (
    <Box
      display="flex"
      p="12px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {id}
        </Typography>
        <Typography color={colors.grey[400]}>{createdAt}</Typography>
      </Box>
      <Button color="primary" onClick={() => setSelectedOrder(id)}>
        See
      </Button>
    </Box>
  )
}

export default RecentOrder
