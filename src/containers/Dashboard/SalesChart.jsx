import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

const yearList = [
  moment().year(),
  moment().year() - 1,
  moment().year() - 2,
  moment().year() - 3
]

const weekList = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box backgroundColor="white" p="4px">
        <Typography color="primary.main">{`Number of Orders: ${payload[0].payload.orders}`}</Typography>
        <Typography color="gray">{`${payload[0].payload.date}`}</Typography>
      </Box>
    )
  }

  return null
}

const SalesChart = ({ orders, filter }) => {
  const filteredMonth = monthList.map(month => {
    const total = orders.filter(
      order =>
        moment(order.createdAt).format('MMM YYYY') ===
        `${month} ${moment().year()}`
    )

    return { date: month, orders: total.length }
  })

  const filteredWeek = weekList.map((week, index) => {
    const total = orders.filter(
      order => moment(order.createdAt).week() === index + 1
    )
    return { date: week, orders: total.length }
  })

  const filteredYear = yearList
    .map(year => {
      const total = orders.filter(
        order => moment(order.createdAt).format('YYYY') === year.toString()
      )
      return { date: year, orders: total.length }
    })
    .sort((a, b) => Number(a.date) - Number(b.date))

  const past7Days = moment().subtract(7, 'days')
  const defaultData = orders
    .filter(order => moment(order.createdAt) > past7Days)
    .map(order => {
      if (moment(order.createdAt).isSame(moment(order.createdAt), 'days')) {
        return {
          date: moment(order.createdAt).format('MMMM DD YYYY')
        }
      }
    })
    .reduce((acc, obj) => {
      const key = obj.date
      if (!acc[key]) {
        acc[key] = { ...obj, orders: 0 }
      }
      acc[key].orders += 1
      return acc
    }, {})

  const orderCharts = Object.values(defaultData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const filteredChart = () => {
    switch (filter) {
      case 'default':
        return orderCharts
      case 'weekly':
        return filteredWeek
      case 'monthly':
        return filteredMonth
      case 'yearly':
        return filteredYear
      default:
        return
    }
  }

  return (
    <Box
      backgroundColor="primary.main"
      width="100%"
      height="100%"
      borderRadius="12px"
      color="white"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredChart()}>
          <Tooltip content={<CustomToolTip />} />
          <Line dataKey="orders" stroke="#ffffff" type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default SalesChart
