import { Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Loading from '../components/Loading'
import { useGetAllProducts } from '../containers/actions'
import OrderBar from '../containers/Order/OrderBar'
import SelectProduct from '../containers/Order/SelectProduct'
import { useOrder } from '../contexts/OrderContext'

const OrderPage = () => {
  const { data: productData, isValidating: productValidating } =
    useGetAllProducts()

  const [search, setSearch] = useState('')

  const { orderItems } = useOrder()

  if (productValidating) return <Loading />

  const addedProduct = productData?.filter(
    product => !orderItems.some(order => order.name === product.name)
  )

  const searchProduct = addedProduct.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <OrderBar>
      <Box m="24px" width="100%">
        <Box display="flex" justifyContent="flex-end" mb="24px">
          <TextField
            size="small"
            placeholder="Search..."
            onChange={e => setSearch(e.target.value)}
          />
        </Box>
        {searchProduct.length ? (
          <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="16px">
            {searchProduct.map(order => (
              <SelectProduct key={order.name} {...order} />
            ))}
          </Box>
        ) : (
          <Box>
            <Typography>No more products</Typography>
          </Box>
        )}
      </Box>
    </OrderBar>
  )
}

export default OrderPage
