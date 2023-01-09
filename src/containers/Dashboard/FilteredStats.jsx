import { Box, Typography } from '@mui/material'
import moment from 'moment'

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

const FilteredStats = ({ filter, orders }) => {
  const filteredMonth = monthList.map(month => {
    const total = orders
      .filter(
        order =>
          moment(order.createdAt).format('MMM YYYY') ===
          `${month} ${moment().year()}`
      )
      .reduce((acc, obj) => acc + obj.subTotal, 0)

    return { [month]: Number(total).toFixed(2) }
  })

  const filteredWeek = weekList.map((week, index) => {
    const total = orders
      .filter(order => moment(order.createdAt).week() === index + 1)
      .reduce((acc, obj) => acc + obj.subTotal, 0)
    return { [week]: Number(total).toFixed(2) }
  })

  const filteredYear = yearList.map(year => {
    const total = orders
      .filter(
        order => moment(order.createdAt).format('YYYY') === year.toString()
      )
      .reduce((acc, obj) => acc + obj.subTotal, 0)
    return { [year]: Number(total).toFixed(2) }
  })

  return (
    <Box
      width="100%"
      sx={{ position: 'relative' }}
      height="100%"
      border="1px solid gray"
      borderRadius="12px"
    >
      <Box
        display="flex"
        height="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap="24px"
      >
        {filter === 'weekly' && (
          <>
            {filteredWeek.map(week => (
              <StatItem
                key={Object.keys(week)}
                title={Object.keys(week)}
                value={Object.values(week)}
              />
            ))}
          </>
        )}
        {filter === 'monthly' && (
          <>
            {filteredMonth.map(month => (
              <StatItem
                key={Object.keys(month)}
                title={Object.keys(month)}
                value={Object.values(month)}
              />
            ))}
          </>
        )}
        {filter === 'yearly' && (
          <>
            {filteredYear.map(year => (
              <StatItem
                key={Object.keys(year)}
                title={Object.keys(year)}
                value={Object.values(year)}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  )
}

export default FilteredStats
