import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { toast } from 'react-hot-toast'

const OrderContext = createContext()

const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([])
  const [selectedOrder, setSelectedOrder] = useState()

  useEffect(() => {
    if (orderItems.some(order => order.amount <= 0)) {
      setOrderItems(orderItems.filter(order => order.amount > 0))
    }
  }, [orderItems])

  const addOrderItem = useCallback(item => {
    return setOrderItems(prevItems => [...prevItems, item])
  }, [])

  const removeOrderItem = useCallback(name => {
    return setOrderItems(prevItems =>
      prevItems.filter(item => item.name !== name)
    )
  }, [])

  const removeAllItems = useCallback(() => {
    return setOrderItems([])
  })

  const increaseAmount = useCallback(
    item => {
      const newState = orderItems.map(order =>
        order.name === item.name
          ? { ...order, amount: (item.amount += 1) }
          : order
      )

      if (
        newState.some(
          order => order.name === item.name && order.amount > item.quantity
        )
      ) {
        toast.error(
          `You can't order more than ${item.quantity} ${item.name}(s).`
        )
      } else {
        setOrderItems(newState)
      }
    },
    [orderItems]
  )

  const decreaseAmount = useCallback(
    item => {
      const newState = orderItems.map(order =>
        order.name === item.name
          ? { ...order, amount: (item.amount -= 1) }
          : order
      )

      setOrderItems(newState)
    },
    [orderItems]
  )

  const value = useMemo(
    () => ({
      orderItems,
      addOrderItem,
      removeAllItems,
      removeOrderItem,
      increaseAmount,
      decreaseAmount,
      selectedOrder,
      setSelectedOrder
    }),
    [
      orderItems,
      addOrderItem,
      removeOrderItem,
      removeAllItems,
      increaseAmount,
      decreaseAmount,
      selectedOrder,
      setSelectedOrder
    ]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => useContext(OrderContext)

export default OrderProvider
