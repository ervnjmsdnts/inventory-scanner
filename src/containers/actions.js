import { useCallback, useState } from 'react'
import useSWR from 'swr'
import client, { API_URL } from '../lib/client'

const useLogin = () => {
  const [response, setReponse] = useState()
  const [error, setError] = useState()
  const [isValidating, setIsValidating] = useState(false)

  const login = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true)
      const { data } = await client.post('/auth/login', payload)
      setReponse(data)
      return data
    } catch (error) {
      setError(error.response.data)
      throw error
    } finally {
      setIsValidating(false)
    }
  }, [])

  return {
    data: response,
    error,
    isValidating,
    login
  }
}

const useGetAllProducts = () => {
  const { ...rest } = useSWR(`${API_URL}/product`)

  return { ...rest }
}

const useGetProduct = productId => {
  const { ...rest } = useSWR(`${API_URL}/product/${productId}`)

  return { ...rest }
}

const useFetchApiProduct = productCode => {
  const { ...rest } = useSWR(`${API_URL}/product/fetch/${productCode}`)

  return { ...rest }
}

const useAddProduct = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isValidating, setIsValidating] = useState(false)

  const addProduct = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true)
      const { data } = await client.post('/product', payload)
      setResponse(data)
      return data
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsValidating(false)
    }
  }, [])

  return {
    data: response,
    error,
    isValidating,
    addProduct
  }
}

const useUpdateProduct = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isValidating, setIsValidating] = useState(false)

  const updateProduct = useCallback(async (productId, payload = {}) => {
    try {
      setIsValidating(true)
      const { data } = await client.patch(`/product/${productId}`, payload)
      setResponse(data)
      return data
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsValidating(false)
    }
  }, [])

  return {
    data: response,
    error,
    isValidating,
    updateProduct
  }
}

const useDeleteProduct = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isValidating, setIsValidating] = useState(false)

  const deleteProduct = useCallback(async productId => {
    try {
      setIsValidating(true)
      const { data } = await client.delete(`/product/${productId}`)
      setResponse(data)
      return data
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsValidating(false)
    }
  }, [])

  return {
    data: response,
    error,
    isValidating,
    deleteProduct
  }
}

const useGetAllOrders = () => {
  const { ...rest } = useSWR('/order')

  return { ...rest }
}

const useAddOrder = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isValidating, setIsValidating] = useState(false)

  const addOrder = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true)
      const { data } = await client.post('/order', payload)
      setResponse(data)
      return data
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsValidating(false)
    }
  }, [])

  return {
    data: response,
    error,
    isValidating,
    addOrder
  }
}

const useChangeImage = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isValidating, setIsValidating] = useState(false)

  const changeImage = useCallback(async (id, payload = {}) => {
    try {
      setIsValidating(true)
      const { data } = await client.patch(
        `/product/change-image/${id}`,
        payload
      )
      setResponse(data)
      return data
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsValidating(false)
    }
  }, [])

  return {
    data: response,
    error,
    isValidating,
    changeImage
  }
}

export {
  useChangeImage,
  useLogin,
  useGetAllProducts,
  useGetProduct,
  useUpdateProduct,
  useDeleteProduct,
  useFetchApiProduct,
  useAddProduct,
  useAddOrder,
  useGetAllOrders
}
