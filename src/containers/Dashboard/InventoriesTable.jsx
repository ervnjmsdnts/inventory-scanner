import { DeleteOutline } from '@mui/icons-material'
import { Box, colors, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDeleteProduct, useUpdateProduct } from '../actions'

const DeleteButton = ({ id, mutate }) => {
  const { deleteProduct } = useDeleteProduct()

  const deleteExec = useCallback(async () => {
    await deleteProduct(id)
    toast.success('Item deleted')
    return mutate()
  }, [mutate])

  return (
    <IconButton onClick={deleteExec}>
      <DeleteOutline sx={{ color: colors.red[300] }} />
    </IconButton>
  )
}

const InventoriesTable = ({ products, mutate }) => {
  const columns = [
    {
      field: 'barcode',
      headerName: 'Barcode',
      width: 200
    },
    { field: 'name', headerName: 'Name', width: 400, editable: true },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      editable: true
    },
    { field: 'price', headerName: 'Price', type: 'number', editable: true },
    {
      headerName: '',
      renderCell: params => <DeleteButton id={params.id} mutate={mutate} />,
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 200
    }
  ]

  const { updateProduct } = useUpdateProduct()

  const cellEditCommit = useCallback(
    async params => {
      await updateProduct(params.id, { [params.field]: params.value })
      toast.success('Saved')
      return mutate()
    },
    [mutate]
  )

  return (
    <Box
      width="100%"
      height="100%"
      borderRadius="12px"
      backgroundColor={colors.blueGrey[50]}
    >
      <DataGrid
        getRowId={row => row._id}
        sx={{ border: 'none' }}
        rows={products}
        onCellEditCommit={cellEditCommit}
        columns={columns}
        pageSize={10}
      />
    </Box>
  )
}

export default InventoriesTable
