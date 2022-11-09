import { Box, Dialog, DialogTitle, Typography } from '@mui/material'

const Order = ({ image, name }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box component="img" src={image} alt="food" width="72px" height="72px" />
      <Typography>{name}</Typography>
    </Box>
  )
}

const OrderDialog = ({ onClose, open, order }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Order Details</DialogTitle>
      <Box width="400px">
        <Box p="8px 16px">
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            maxHeight="300px"
            overflow="auto"
          >
            {order.products.map(product => (
              <Order {...product} key={product._id} />
            ))}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          backgroundColor="primary.main"
          alignItems="center"
          color="white"
          p="8px 16px"
        >
          <Typography fontWeight="bold">Total</Typography>
          <Typography variant="h6" fontWeight="bold">
            &#x20B1;{order.total}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  )
}

export default OrderDialog
