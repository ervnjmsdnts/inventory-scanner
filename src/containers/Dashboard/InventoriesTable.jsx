import { DeleteOutline, UploadFile } from '@mui/icons-material'
import { Box, Button, colors, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useChangeImage, useDeleteProduct } from '../actions'
import AddProductDialog from './AddProductDialog'
import { red } from '@mui/material/colors'

const DeleteButton = ({ id, mutate }) => {
  const { deleteProduct } = useDeleteProduct()

  const deleteExec = useCallback(async () => {
    await deleteProduct(id)
    toast.success('Item deleted')
    return mutate()
  }, [mutate])

  return (
    <Tooltip title="Delete Product">
      <IconButton onClick={deleteExec}>
        <DeleteOutline sx={{ color: colors.red[400] }} />
      </IconButton>
    </Tooltip>
  )
}

const ChangeImageButton = ({ id, mutate }) => {
  const { changeImage } = useChangeImage()
  const handleChangeImage = (e, id) => {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      try {
        await changeImage(id, { image: reader.result })
        toast.success('Image Changed Successfully')
        return mutate()
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <Tooltip title="Change Image">
      <Button component="label">
        <UploadFile sx={{ color: colors.blue[300] }} />
        <input type="file" hidden onChange={e => handleChangeImage(e, id)} />
      </Button>
    </Tooltip>
  )
}

const InventoriesTable = ({ products, mutate }) => {
  const columns = [
    {
      field: 'image',
      headerName: '',
      renderCell: params => (
        <Box component="img" src={params.row.image} width="50px" />
      ),
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true
    },
    {
      field: 'barcode',
      headerName: 'Barcode',
      flex: 1
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number'
    },
    { field: 'price', headerName: 'Price', type: 'number' },
    {
      field: 'delete',
      headerName: '',
      renderCell: params => <DeleteButton id={params.id} mutate={mutate} />,
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true
    },
    {
      field: 'changeImage',
      headerName: '',
      renderCell: params => (
        <ChangeImageButton id={params.id} mutate={mutate} />
      ),
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true
    }
  ]

  console.log({ products })

  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openModal = data => {
    setSelectedProduct(data)
    setOpen(true)
  }

  return (
    <>
      <AddProductDialog
        open={open}
        onClose={() => setOpen(false)}
        isEdit
        data={selectedProduct}
      />
      <Box
        width="100%"
        height="100%"
        borderRadius="12px"
        backgroundColor={colors.blueGrey[50]}
      >
        <DataGrid
          getRowId={row => row._id}
          sx={{
            border: 'none',
            '.out-of-stock': {
              bgcolor: red[100],
              ':hover': {
                bgcolor: red[200]
              }
            }
          }}
          rows={products}
          getRowClassName={params =>
            params.row.quantity <= 0 ? 'out-of-stock' : ''
          }
          onRowDoubleClick={item => openModal(item.row)}
          row
          columns={columns}
          pageSize={10}
        />
      </Box>
    </>
  )
}

export default InventoriesTable
