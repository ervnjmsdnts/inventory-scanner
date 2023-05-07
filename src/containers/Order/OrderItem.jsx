import { Box, colors, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@mui/icons-material/Close'
import { useOrder } from '../../contexts/OrderContext'
import { useState } from 'react'

const OrderItem = props => {
  const { increaseAmount, decreaseAmount, orderItems, removeOrderItem } =
    useOrder()
  const [showClose, setShowClose] = useState(false)

  const { name } = props

  const item = orderItems?.filter(order => order.name === name)[0]

  const calculatedPrice = item.amount * item.price

  console.log({ orderItems })

  return (
    <Box
      p="16px"
      backgroundColor={colors.blueGrey[50]}
      borderRadius="12px"
      min-height="150px"
      position="relative"
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => setShowClose(false)}
    >
      {showClose ? (
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={() => removeOrderItem(item.name)}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box
            component="img"
            src={item.image ? item.image : 'https://via.placeholder.com/100'}
            alt="moreFood"
            width="72px"
            height="72px"
          />
          <Box>
            <Typography>{item.name}</Typography>
            <Typography variant="h6">&#x20B1;{calculatedPrice}</Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <IconButton
            color="primary"
            onClick={() => decreaseAmount({ ...item })}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{item.amount}</Typography>
          <IconButton
            color="primary"
            onClick={() => increaseAmount({ ...item })}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderItem
