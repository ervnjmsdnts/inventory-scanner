import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useState } from 'react'
import { CSVLink } from 'react-csv'

const GenerateReportDialog = ({ orders, open, onClose }) => {
  const [from, setFrom] = useState(moment())
  const [to, setTo] = useState(moment())

  const filteredOrders = orders
    .filter(order =>
      moment(order.createdAt).isBetween(
        moment(from),
        moment(to),
        undefined,
        '[]'
      )
    )
    .map(order => ({
      ID: order._id,
      'Number of Orders': order.products.length,
      Total: order.subTotal.toFixed(2),
      'Payment Amount': order.paymentAmount.toFixed(2),
      'Change Due': (order.paymentAmount - order.subTotal).toFixed(2),
      'Order Date': moment(order.createdAt).format('MMMM/DD/YYYY hh:mm:ss A')
    }))

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Generate Report</DialogTitle>
      <Box p="8px" display="flex" flexDirection="column" gap="16px">
        <Box
          display="flex"
          alignItems="center"
          gap="8px"
          justifyContent="center"
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="From"
              value={from}
              onChange={newValue => {
                setFrom(newValue)
              }}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Typography>--</Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="To"
              value={to}
              onChange={newValue => {
                setTo(newValue)
              }}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <CSVLink
          style={{ width: '100%', textDecoration: 'none' }}
          data={filteredOrders}
          filename={`orders_${moment(from).format('MMM/DD/YYYY')}-${moment(
            to
          ).format('MMM/DD/YYYY')}`}
        >
          <Button variant="contained" fullWidth>
            Download CSV
          </Button>
        </CSVLink>
      </Box>
    </Dialog>
  )
}

export default GenerateReportDialog
