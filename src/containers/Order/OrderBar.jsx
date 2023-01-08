import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import { useOrder } from '../../contexts/OrderContext'
import OrderItem from './OrderItem'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useCallback, useEffect, useState } from 'react'
import { useAddOrder } from '../actions'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import ReceiptModal from './ReceiptModal'

const drawerWidth = 400

const OrderBar = ({ children }) => {
  const { orderItems, removeAllItems } = useOrder()

  const { register, watch } = useForm({
    defaultValues: { paymentAmount: 0 }
  })

  const paymentAmount = Number(watch('paymentAmount'))

  const subTotal = orderItems.reduce((acc, obj) => {
    return acc + obj.amount * obj.price
  }, 0)

  const vatTotal = (subTotal * 0.12).toFixed(2)

  const total = subTotal + vatTotal

  const change =
    paymentAmount < subTotal ? '0.00' : (paymentAmount - subTotal).toFixed(2)

  const vatableSale = (subTotal - vatTotal).toFixed(2)

  const {
    isValidating: addOrderValidating,
    addOrder,
    data,
    error
  } = useAddOrder()

  const onSubmit = useCallback(async () => {
    const products = orderItems.map(order => ({
      productId: order._id,
      name: order.name,
      barcode: order.barcode,
      price: order.price,
      image: order.image,
      amount: order.amount
    }))
    const payload = {
      products,
      paymentAmount: Number(watch('paymentAmount')),
      subTotal,
      total
    }

    await addOrder({ ...payload })
    toast.success('Added order')
  }, [orderItems])

  const [open, setOpen] = useState(false)
  const [receiptData, setReceiptData] = useState(null)

  useEffect(() => {
    const openModal = () => {
      if (!data && !error) return
      if (error) return toast.error('Something went wrong')

      setReceiptData(data)
      setOpen(true)
    }
    openModal()
  }, [data, error])

  return (
    <>
      <ReceiptModal
        open={open}
        onClose={() => setOpen(false)}
        data={receiptData}
      />
      <Box display="flex" height="100%">
        {children}
        <Drawer
          sx={{
            width: drawerWidth,
            padding: '24px',
            flexShrink: 0,
            height: '100%',
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              padding: '24px',
              boxSizing: 'border-box',

              height: '100%'
            }
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar />
          <Box
            display="flex"
            justifyContent="space-between"
            mb="16px"
            alignItems="center"
          >
            <Typography variant="h4" fontWeight="bold">
              Order
            </Typography>
            {orderItems.length ? (
              <IconButton color="error" onClick={removeAllItems}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            ) : null}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              height="600px"
              overflow="auto"
            >
              {orderItems.map((order, index) => (
                <OrderItem {...order} key={index} />
              ))}
            </Box>
            <Box>
              <Box
                mb="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Total</Typography>
                <Typography>&#x20B1;{subTotal}</Typography>
              </Box>
              <Box
                mb="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Vatable Sale</Typography>
                <Typography>&#x20B1;{vatableSale}</Typography>
              </Box>
              <Box
                mb="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Vat (12%)</Typography>
                <Typography>&#x20B1;{vatTotal}</Typography>
              </Box>
              <Box
                mb="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Payment Amount</Typography>
                <TextField
                  type="number"
                  placeholder="Enter amount"
                  size="small"
                  {...register('paymentAmount', { min: 0 })}
                />
              </Box>
              <Box
                mb="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Change Due</Typography>
                <Typography>&#x20B1;{change}</Typography>
              </Box>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={onSubmit}
                disabled={addOrderValidating || paymentAmount < subTotal}
              >
                {paymentAmount < subTotal ? 'Insufficient Amount' : 'Confirm'}
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  )
}

export default OrderBar
