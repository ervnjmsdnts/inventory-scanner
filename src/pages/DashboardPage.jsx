import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import Header from '../components/Header'
import RecentOrder from '../containers/Dashboard/RecentOrder'
import SalesChart from '../containers/Dashboard/SalesChart'
import Statistics from '../containers/Dashboard/Statistics'
import InventoriesTable from '../containers/Dashboard/InventoriesTable'
import { useGetAllOrders, useGetAllProducts } from '../containers/actions'
import { useMemo, useState } from 'react'
import moment from 'moment'
import Loading from '../components/Loading'
import { useOrder } from '../contexts/OrderContext'
import OrderDialog from './OrderDialog'
import AddProductDialog from '../containers/Dashboard/AddProductDialog'
import { Controller, useForm } from 'react-hook-form'
import FilteredStats from '../containers/Dashboard/FilteredStats'
import GenerateReportDialog from '../containers/Dashboard/GenerateReportDialog'

const DashboardPage = () => {
  const { selectedOrder, setSelectedOrder } = useOrder()
  const {
    data: products,
    isValidating: productsValidating,
    mutate: productMutate
  } = useGetAllProducts()

  const { control, watch } = useForm({ defaultValues: { filter: 'default' } })

  const filter = watch('filter')

  const [openAdd, setOpenAdd] = useState(false)
  const [openReport, setOpenReport] = useState(false)

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
      <GenerateReportDialog
        open={openReport}
        onClose={() => setOpenReport(false)}
        orders={orders}
      />
      <AddProductDialog onClose={() => setOpenAdd(false)} open={openAdd} />
      <Box m="24px">
        <Header title="DASHBOARD" />
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Controller
            control={control}
            name="filter"
            defaultValue="default"
            render={({ field: { value, onChange } }) => (
              <FormControl>
                <InputLabel id="filter">Filter</InputLabel>
                <Select
                  sx={{ width: '300px', mb: '16px' }}
                  labelId="filter"
                  label="Filter"
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            )}
          ></Controller>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gap="24px">
          <Box gridColumn="span 3" height="300px">
            <SalesChart orders={orders} filter={!filter ? 'default' : filter} />
          </Box>
          <Box gridColumn="span 6" height="300px">
            <Statistics orders={orders} filter={!filter ? 'default' : filter} />
          </Box>
          {filter !== 'default' ? (
            <Box gridColumn="span 9" height="200px">
              <FilteredStats filter={filter} orders={orders} />
            </Box>
          ) : null}
          <Box gridColumn="span 9" gap="8px">
            <Typography variant="h4" fontWeight="bold">
              Inventory & Orders
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button variant="contained" onClick={() => setOpenAdd(true)}>
                Add Product
              </Button>
              <Button variant="contained" onClick={() => setOpenReport(true)}>
                Generate Report
              </Button>
            </Box>
          </Box>
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
