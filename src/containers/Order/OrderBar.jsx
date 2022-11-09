import {
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import { useOrder } from '../../contexts/OrderContext'
import OrderItem from './OrderItem'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useCallback } from 'react'
import { useAddOrder } from '../actions'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 400

const OrderBar = ({ children }) => {
  const { orderItems, removeAllItems } = useOrder()

  const navigate = useNavigate()

  const total = orderItems.reduce((acc, obj) => {
    return acc + obj.amount * obj.price
  }, 0)

  const { isValidating: addOrderValidating, addOrder } = useAddOrder()

  const onSubmit = useCallback(async () => {
    const products = orderItems.map(order => order._id)
    const payload = { products, total }
    await addOrder({ ...payload })
    toast.success('Added order')

    return navigate('/app/dashboard')
  }, [orderItems])

  return (
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
              <Typography>&#x20B1;{total}</Typography>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={onSubmit}
              disabled={addOrderValidating}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default OrderBar
