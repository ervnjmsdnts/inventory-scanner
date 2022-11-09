import { Box, Typography } from '@mui/material'
import Header from '../components/Header'
import RecentOrder from '../containers/Dashboard/RecentOrder'
import SalesChart from '../containers/Dashboard/SalesChart'
import Statistics from '../containers/Dashboard/Statistics'
import InventoriesTable from '../containers/Dashboard/InventoriesTable'
import { useGetAllOrders, useGetAllProducts } from '../containers/actions'
import { useMemo } from 'react'
import moment from 'moment'
import Loading from '../components/Loading'
import { useOrder } from '../contexts/OrderContext'
import OrderDialog from './OrderDialog'

const DashboardPage = () => {
  const { selectedOrder, setSelectedOrder } = useOrder()
  const {
    data: products,
    isValidating: productsValidating,
    mutate: productMutate
  } = useGetAllProducts()

  const { data: orders, isValidating: ordersValidating } = useGetAllOrders()

  const isValidating = useMemo(
    () => productsValidating || ordersValidating,
    [productsValidating, ordersValidating]
  )

  if (isValidating) return <Loading />

  const handleClose = () => {
    setSelectedOrder(null)
  }

  const order = orders.find(o => o._id === selectedOrder)

  return (
    <>
      {order && (
        <OrderDialog
          open={!!selectedOrder}
          onClose={handleClose}
          order={order}
        />
      )}
      <Box m="24px">
        <Header title="DASHBOARD" />
        <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gap="24px">
          <Box gridColumn="span 3" height="300px">
            <SalesChart orders={orders} />
          </Box>
          <Box gridColumn="span 6" height="300px">
            <Statistics orders={orders} />
          </Box>
          <Typography gridColumn="span 9" variant="h4" fontWeight="bold">
            Inventory & Orders
          </Typography>
          <Box gridColumn="span 6" height="300px">
            <InventoriesTable products={products} mutate={productMutate} />
          </Box>
          <Box gridColumn="span 3" gridRow="span 2">
            <Box height="300px" width="100%" overflow="auto">
              {orders.map((order, index) => (
                <RecentOrder
                  id={order._id}
                  createdAt={moment(order.createdAt).format('MMMM DD YYYY')}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DashboardPage
