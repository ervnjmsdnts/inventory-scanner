import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAddProduct } from '../actions'

const AddProductDialog = ({ onClose, open }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { price: 0, quantity: 0 }
  })

  const { addProduct, isValidating: addValidating } = useAddProduct()

  const navigate = useNavigate()

  const onSubmit = useCallback(async data => {
    await addProduct({
      ...data
    })

    navigate(0)
  }, [])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Product</DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        mb="16px"
        p="32px"
        gap={2}
        width="500px"
      >
        <Typography variant="h5" fontWeight="bold">
          Barcode
        </Typography>
        <TextField placeholder="Name" {...register('barcode')} />
        <Typography variant="h5" fontWeight="bold">
          Name
        </Typography>
        <TextField placeholder="Name" {...register('name')} />
        <Typography variant="h5" fontWeight="bold">
          Price
        </Typography>
        <TextField
          type="number"
          placeholder="Price"
          {...register('price', { min: 0 })}
        />
        <Typography variant="h5" fontWeight="bold">
          Quantity
        </Typography>
        <TextField
          type="number"
          placeholder="Quantity"
          {...register('quantity', { min: 0 })}
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleSubmit(onSubmit)}
        disabled={addValidating}
      >
        Save
      </Button>
    </Dialog>
  )
}

export default AddProductDialog
