import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
const data = [
  {
    orders: 6,
    date: '21/6/11'
  },
  {
    orders: 3,
    date: '21/6/11'
  },
  {
    orders: 2,
    date: '21/6/11'
  },
  {
    orders: 4,
    date: '21/6/11'
  },
  {
    orders: 5,
    date: '21/6/11'
  },

  {
    orders: 7,
    date: '21/6/11'
  },
  {
    orders: 5.5,
    date: '21/6/11'
  }
]

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box backgroundColor="white" p="4px">
        <Typography color="primary.main">{`Number of Orders: ${payload[0].payload.orders}`}</Typography>
        <Typography color="gray">{`Date: ${payload[0].payload.date}`}</Typography>
      </Box>
    )
  }

  return null
}

const SalesChart = ({ orders }) => {
  // const past7Days = moment().subtract(7, 'days')
  // const data = orders
  //   .filter(order => moment(order.createdAt) > past7Days)
  //   .map(order => {
  //     if (moment(order.createdAt).isSame(moment(order.createdAt), 'days')) {
  //       return {
  //         date: moment(order.createdAt).format('MMMM DD YYYY')
  //       }
  //     }
  //   })
  //   .reduce((acc, obj) => {
  //     const key = obj.date
  //     if (!acc[key]) {
  //       acc[key] = { ...obj, orders: 0 }
  //     }
  //     acc[key].orders += 1
  //     return acc
  //   }, {})
  //
  // const orderCharts = Object.values(data).sort(
  //   (a, b) => new Date(a.date) - new Date(b.date)
  // )

  return (
    <Box
      backgroundColor="primary.main"
      width="100%"
      height="100%"
      borderRadius="12px"
      color="white"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip content={<CustomToolTip />} />
          <Line dataKey="orders" stroke="#ffffff" type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default SalesChart
