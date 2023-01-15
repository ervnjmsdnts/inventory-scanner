import { Box, Button, Dialog, Divider, Typography } from '@mui/material'
import moment from 'moment'
import { Fragment, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const ReceiptModal = ({ open, onClose, data }) => {
  const componentRef = useRef()
  const printReceipt = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'receipt',
    onAfterPrint: () => onClose(),
    pageStyle: '@page { size: auto; margin: 25mm;}'
  })

  const vatTotal = (data?.subTotal * 0.12).toFixed(2)
  const change = (data?.paymentAmount - data?.subTotal).toFixed(2)
  const vatableSale = (data?.subTotal - vatTotal).toFixed(2)

  return (
    <Dialog onClose={onClose} open={open}>
      <Box
        backgroundColor="white"
        p="16px"
        display="flex"
        flexDirection="column"
        gap="8px"
      >
        <Typography variant="h6" fontWeight="bold">
          Receipt
        </Typography>
        <Box boxShadow={1} maxHeight="600px" overflow="auto">
          <Box ref={componentRef} width="220px" p="4px">
            <Typography
              textAlign="center"
              fontSize="16px"
              mb="8px"
              fontWeight="bold"
            >
              Saranghaeyo Korean Store
            </Typography>
            <Box display="flex" flexDirection="column" gap="8px">
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                fontSize="12px"
                gap="8px"
              >
                <Typography fontSize="12px" gridColumn="span 2">
                  {moment(data?.createdAt).format('MM/DD/YYYY hh:mm:ss')}
                </Typography>
                <Typography fontSize="12px" fontWeight="bold">
                  Order
                </Typography>
                <Typography fontSize="12px">{data?._id}</Typography>
              </Box>
              <Divider />
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                gap="8px"
              >
                <Typography
                  alignSelf="center"
                  fontSize="12px"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Name
                </Typography>
                <Typography
                  fontSize="12px"
                  alignSelf="center"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Price
                </Typography>
                <Typography
                  fontSize="12px"
                  alignSelf="center"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Qty
                </Typography>
                <Typography
                  fontSize="12px"
                  fontWeight="bold"
                  alignSelf="center"
                  textAlign="center"
                >
                  Total Price
                </Typography>
                {data?.products.map(product => (
                  <Fragment key={product._id}>
                    <Typography fontSize="12px">{product.name}</Typography>
                    <Typography fontSize="12px" textAlign="center">
                      &#x20B1;{product.price.toFixed(2)}
                    </Typography>
                    <Typography fontSize="12px" textAlign="center">
                      {product.amount}
                    </Typography>
                    <Typography fontSize="12px" textAlign="center">
                      &#x20B1;{(product.price * product.amount).toFixed(2)}
                    </Typography>
                  </Fragment>
                ))}
              </Box>
              <Box></Box>
              <Divider />
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="12px" fontWeight="bold">
                    Total Price
                  </Typography>
                  <Typography fontSize="12px">
                    &#x20B1;{data?.subTotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="12px" fontWeight="bold">
                    Vatable Sale
                  </Typography>
                  <Typography fontSize="12px">&#x20B1;{vatableSale}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="12px" fontWeight="bold">
                    Vat (12%)
                  </Typography>
                  <Typography fontSize="12px">&#x20B1;{vatTotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="12px" fontWeight="bold">
                    Payment Amount
                  </Typography>
                  <Typography fontSize="12px">
                    &#x20B1;{data?.paymentAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="12px" fontWeight="bold">
                    Change Due
                  </Typography>
                  <Typography fontSize="12px">&#x20B1;{change}</Typography>
                </Box>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize="12px" fontWeight="bold">
                  Number of Orders
                </Typography>
                <Typography fontSize="12px">{data?.products.length}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button variant="contained" onClick={printReceipt}>
          Print Receipt
        </Button>
      </Box>
    </Dialog>
  )
}

export default ReceiptModal
