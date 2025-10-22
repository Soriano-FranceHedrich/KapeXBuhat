import { useEffect } from 'react'
import { Container, Card, Button, Row, Col, ListGroup, Badge, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useOrders } from '../contexts/OrderContext'

// Import Order type from OrderContext
type Order = {
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
  items: Array<{
    order_item_id: number
    order_id: number
    item_id: number
    quantity: number
    unit_price: number
    total_price: number
    special_notes?: string
    item_name: string
    item_image: string
  }>
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const { orders, loading, fetchOrders, updateOrderStatus } = useOrders()

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders()
  }, [])

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { bg: 'warning', text: 'Pending' },
      confirmed: { bg: 'info', text: 'Confirmed' },
      preparing: { bg: 'info', text: 'Preparing' },
      ready: { bg: 'success', text: 'Ready' },
      completed: { bg: 'secondary', text: 'Completed' },
      cancelled: { bg: 'danger', text: 'Cancelled' }
    }
    const config = statusConfig[status]
    return <Badge bg={config.bg}>{config.text}</Badge>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusUpdate = (orderId: number, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-cart-fill text-primary mb-3" style={{ fontSize: '3rem' }}></i>
        <h2 className="display-4 fw-bold mb-4">Your Cart</h2>
        <p className="lead text-muted">
          Review your order before checkout
        </p>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <i className="bi bi-cart-x text-muted mb-3" style={{ fontSize: '4rem' }}></i>
            <h4 className="text-muted">Your cart is empty</h4>
            <p className="text-muted mb-4">Add some delicious drinks and food to get started!</p>
            <Link to="/menu">
              <Button variant="primary" size="lg">
                <i className="bi bi-menu-button-wide me-2"></i>
                Browse Menu
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Order Items ({getTotalItems()} items)
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.id} className="d-flex align-items-center p-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        className="rounded me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-muted mb-0">{item.price}</p>
                      </div>
                      <div className="d-flex align-items-center me-3">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <i className="bi bi-dash"></i>
                        </Button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <i className="bi bi-plus"></i>
                        </Button>
                      </div>
                      <div className="text-end me-3">
                        <div className="fw-bold">₱{parseInt(item.price.replace('₱', '')) * item.quantity}</div>
                      </div>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="sticky-top">
              <Card.Header>
                <h5 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Order Summary
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₱{getTotalPrice()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Service Fee:</span>
                  <span>₱20</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>₱{getTotalPrice() + 20}</strong>
                </div>
                
                <Link to="/checkout">
                  <Button variant="primary" size="lg" className="w-100 mb-3">
                    <i className="bi bi-credit-card me-2"></i>
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/menu">
                  <Button variant="outline-primary" className="w-100">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add More Items
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Orders Table */}
      <div className="mt-5">
        <h4 className="mb-4">
          <i className="bi bi-clock-history me-2"></i>
          Your Orders
        </h4>
        
        {loading ? (
          <Card>
            <Card.Body className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Loading your orders...</p>
            </Card.Body>
          </Card>
        ) : orders.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-5">
              <i className="bi bi-inbox text-muted mb-3" style={{ fontSize: '3rem' }}></i>
              <h5 className="text-muted">No orders yet</h5>
              <p className="text-muted mb-4">Your order history will appear here once you place an order.</p>
              <Link to="/menu">
                <Button variant="primary">
                  <i className="bi bi-menu-button-wide me-2"></i>
                  Browse Menu
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order #</th>
                    <th>Items</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>
                        <strong>#{order.order_number}</strong>
                      </td>
                      <td>
                        <div className="small">
                          {order.items.map((item, index) => (
                            <div key={item.order_item_id}>
                              {item.item_name} x{item.quantity}
                              {index < order.items.length - 1 && <br />}
                            </div>
                          ))}
                        </div>
                        {order.special_instructions && (
                          <div className="text-muted small mt-1">
                            <i className="bi bi-chat-text me-1"></i>
                            {order.special_instructions}
                          </div>
                        )}
                      </td>
                      <td>
                        <Badge bg="secondary">
                          {order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1).replace('_', ' ')}
                        </Badge>
                      </td>
                      <td>
                        <div className="small">
                          <div>Subtotal: ₱{order.total_amount}</div>
                          <div>Service: ₱{order.service_fee}</div>
                          <strong className="text-primary">Total: ₱{order.total_amount + order.service_fee}</strong>
                        </div>
                      </td>
                      <td>
                        {getStatusBadge(order.status)}
                      </td>
                      <td>
                        <div className="small text-muted">
                          {formatDate(order.created_at)}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          {order.status === 'pending' && (
                            <Button 
                              variant="warning" 
                              size="sm"
                              onClick={() => handleStatusUpdate(order.order_id, 'confirmed')}
                            >
                              <i className="bi bi-check-circle me-1"></i>
                              Confirm
                            </Button>
                          )}
                          {order.status === 'confirmed' && (
                            <Button 
                              variant="info" 
                              size="sm"
                              onClick={() => handleStatusUpdate(order.order_id, 'preparing')}
                            >
                              <i className="bi bi-hourglass-split me-1"></i>
                              Start Preparing
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={() => handleStatusUpdate(order.order_id, 'ready')}
                            >
                              <i className="bi bi-check-circle me-1"></i>
                              Ready for Pickup
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleStatusUpdate(order.order_id, 'completed')}
                            >
                              <i className="bi bi-check me-1"></i>
                              Mark Completed
                            </Button>
                          )}
                          {order.status === 'completed' && (
                            <div className="text-center">
                              <Badge bg="success" className="mb-1">
                                <i className="bi bi-check-circle me-1"></i>
                                Completed
                              </Badge>
                              <div className="small text-muted">
                                Order finished
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  )
}
