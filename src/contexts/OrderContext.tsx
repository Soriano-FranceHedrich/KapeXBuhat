import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface OrderItem {
  order_item_id: number
  order_id: number
  item_id: number
  quantity: number
  unit_price: number
  total_price: number
  special_notes?: string
  item_name: string
  item_image: string
}

interface Order {
  order_id: number
  order_number: string
  total_amount: number
  service_fee: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  order_type: 'dine_in' | 'takeout' | 'delivery'
  special_instructions?: string
  created_at: string
  updated_at: string
  user_id?: number
  customer_info?: {
    firstName: string
    lastName: string
    email?: string
    phone: string
    address?: string
    city?: string
    zipCode?: string
    paymentMethod: string
  }
  items: OrderItem[]
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: number, status: Order['status']) => void
  fetchOrders: () => Promise<void>
  loading: boolean
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('kape-x-buhat-orders')
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders)
        // Filter out dummy orders (KXB001, KXB002, KXB003)
        const realOrders = parsedOrders.filter((order: Order) => 
          !['KXB001', 'KXB002', 'KXB003'].includes(order.order_number)
        )
        setOrders(realOrders)
        
        // Update localStorage with filtered orders
        if (realOrders.length !== parsedOrders.length) {
          localStorage.setItem('kape-x-buhat-orders', JSON.stringify(realOrders))
        }
      } catch (error) {
        console.error('Error parsing saved orders:', error)
        localStorage.removeItem('kape-x-buhat-orders')
      }
    }
  }, [])

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('kape-x-buhat-orders', JSON.stringify(orders))
    }
  }, [orders])

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders])
  }

  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.order_id === orderId
          ? { ...order, status, updated_at: new Date().toISOString() }
          : order
      )
    )
  }

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/orders')
      // const data = await response.json()
      // setOrders(data)
      
      // No sample orders - only real orders from localStorage or API
      console.log('Orders loaded from localStorage or will be empty initially')
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrderStatus, fetchOrders, loading }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
