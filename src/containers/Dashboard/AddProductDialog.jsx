import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAddProduct, useUpdateProduct } from '../actions'

const AddProductDialog = ({ onClose, open, isEdit, data }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { price: 0, quantity: 0 }
  })

  const { addProduct, isValidating: addValidating } = useAddProduct()
  const { updateProduct, isValidating: editValidating } = useUpdateProduct()

  useEffect(() => {
    const setProduct = () => {
      if (!isEdit && !data) return
      setValue('barcode', data?.barcode)
      setValue('name', data?.name)
      setValue('price', data?.price)
      setValue('quantity', data?.quantity)
    }
    setProduct()
  }, [isEdit, data])

  const navigate = useNavigate()

  const isValidating = useMemo(
    () => addValidating || editValidating,
    [addValidating, editValidating]
  )

  const onSubmit = useCallback(
    async payload => {
      if (isEdit) {
        await updateProduct(data?._id, { ...payload })
      } else {
        await addProduct({
          ...payload
        })
      }

      navigate(0)
    },
    [data, isEdit]
  )

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight="bold" variant="h5">
          {isEdit ? 'Edit Product' : 'Add Product'}
        </Typography>
        {!isEdit && (
          <Button variant="contained" onClick={() => navigate('/scan')}>
            Scan Product
          </Button>
        )}
      </DialogTitle>
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
        <TextField placeholder="Code" {...register('barcode')} />
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
        disabled={isValidating}
      >
        Save
      </Button>
    </Dialog>
  )
}

export default AddProductDialog
