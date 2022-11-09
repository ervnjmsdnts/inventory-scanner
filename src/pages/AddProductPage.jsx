import { Box, Button, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useAddProduct, useFetchApiProduct } from '../containers/actions'

const AddProductPage = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { price: 0, quantity: 0 }
  })

  const { barcode } = useParams()

  const { addProduct, isValidating: addValidating } = useAddProduct()

  const {
    data: fetchData,
    error: fetchError,
    isValidating: fetchValidating
  } = useFetchApiProduct(barcode)

  useEffect(() => {
    if (fetchData) {
      setValue('name', fetchData.name)
    }
  }, [fetchData])

  const onSubmit = useCallback(
    async data => {
      await addProduct({
        ...data,
        barcode: fetchData.code,
        image: fetchData.imageUrl
      })

      toast.success('Added product to inventory')

      window.location.reload()
    },
    [fetchData]
  )

  const isValidating = useMemo(
    () => fetchValidating || addValidating,
    [fetchValidating, addValidating]
  )

  if (isValidating) return <Loading />

  if (fetchError?.response?.data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h2" fontWeight="bold">
          Product Already in Inventory
        </Typography>
      </Box>
    )

  return (
    <Box m="24px" display="flex" flexDirection="column" alignItems="center">
      <Typography mb="16px" variant="h4" fontWeight="bold">
        Add Product
      </Typography>
      <Box
        component="img"
        src={
          fetchData?.imageUrl
            ? fetchData?.imageUrl
            : 'https://via.placeholder.com/100'
        }
        alt="food"
        width="150px"
      />
      <Box display="flex" flexDirection="column" mb="16px" gap={2} width="100%">
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
    </Box>
  )
}

export default AddProductPage
