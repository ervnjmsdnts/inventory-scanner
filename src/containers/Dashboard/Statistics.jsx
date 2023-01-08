import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'

const StatItem = ({ title, value = 0 }) => {
  return (
    <Box>
      <Typography variant="h3" fontWeight="bold">
        &#x20B1;{value}
      </Typography>
      <Typography variant="h5" fontWeight="light">
        {title}
      </Typography>
    </Box>
  )
}

const Statistics = ({ orders }) => {
  console.log({ orders })
  const today = moment()
  const todaysSalesValue = orders
    .filter(order => moment(order.createdAt).isSame(today, 'days'))
    .reduce((acc, obj) => acc + obj.subTotal, 0)

  const past7Days = moment().subtract(7, 'days')
  const past7DaysValue = orders
    .filter(order => moment(order.createdAt) > past7Days)
    .reduce((acc, obj) => acc + obj.subTotal, 0)

  const past30Days = moment().subtract(30, 'days')
  const past30DaysValue = orders
    .filter(order => moment(order.createdAt) > past30Days)
    .reduce((acc, obj) => acc + obj.subTotal, 0)

  return (
    <Box
      width="100%"
      sx={{ position: 'relative' }}
      height="100%"
      border="1px solid gray"
      borderRadius="12px"
    >
      <Button sx={{ position: 'absolute', top: 0, right: 0 }}>View</Button>
      <Box
        display="flex"
        height="100%"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <StatItem title="TODAY'S SALES" value={todaysSalesValue.toFixed(2)} />
        <StatItem title="LAST 7 DAYS" value={past7DaysValue.toFixed(2)} />
        <StatItem title="LAST 30 DAYS" value={past30DaysValue.toFixed(2)} />
      </Box>
    </Box>
  )
}

export default Statistics
