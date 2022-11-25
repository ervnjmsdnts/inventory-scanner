import { Box, Dialog, DialogTitle, Typography } from '@mui/material'

const Order = ({ image, name, price, amount }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      alignItems="center"
    >
      <Box component="img" src={image} alt="food" width="72px" height="72px" />
      <Typography>{name}</Typography>
      <Typography textAlign="center">{amount}</Typography>
      <Typography textAlign="center">&#x20B1;{price * amount}</Typography>
    </Box>
  )
}

const OrderDialog = ({ onClose, open, order }) => {
  const vatTotal = (order.subTotal * 0.12).toFixed(2)
  const vatableSale = (order.subTotal - vatTotal).toFixed(2)
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Order Details</DialogTitle>
      <Box width="600px">
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
      </Box>
      <Box
        bgcolor="primary.main"
        color="white"
        display="flex"
        flexDirection="column"
        gap="8px"
        p="8px 16px"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Total</Typography>
          <Typography>&#x20B1;{order.subTotal}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Vatable Sale</Typography>
          <Typography>&#x20B1;{vatableSale}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Vat (12%)</Typography>
          <Typography>&#x20B1;{vatTotal}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Payment Amount</Typography>
          <Typography>&#x20B1;{order.paymentAmount}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Change Due</Typography>
          <Typography>
            &#x20B1;{(order.paymentAmount - order.subTotal).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  )
}

export default OrderDialog
