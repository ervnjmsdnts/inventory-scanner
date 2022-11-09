import { Box, colors, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useOrder } from '../../contexts/OrderContext'

const SelectProduct = props => {
  const { addOrderItem } = useOrder()
  const { name, price, quantity, image } = props

  return (
    <Box
      width="100%"
      height="100%"
      borderRadius="12px"
      backgroundColor="white"
      boxShadow={2}
      position="relative"
      p="16px"
    >
      <Box position="absolute" right={-10} top={-10}>
        <IconButton
          width="30px"
          height="30px"
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: colors.blue[100] }
          }}
          onClick={() => addOrderItem({ ...props, amount: 1 })}
          borderRadius="999px"
          p="4px"
        >
          <AddIcon sx={{ color: '#ffffff' }} />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          component="img"
          mb="16px"
          src={image}
          width="150px"
          height="150px"
          alt="food"
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Typography fontWeight="bold" variant="h6" height="75px">
          {name}
        </Typography>
        <Typography color={colors.grey[400]}>{quantity} Qty.</Typography>
        <Typography fontWeight="bold" variant="h5">
          &#x20B1;{price}
        </Typography>
      </Box>
    </Box>
  )
}

export default SelectProduct
