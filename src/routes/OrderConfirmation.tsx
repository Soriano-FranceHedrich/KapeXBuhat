import { useParams } from 'react-router-dom'
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useOrders } from '../contexts/OrderContext'

export default function OrderConfirmation() {
  const { orderNumber } = useParams()
  const { orders } = useOrders()
  
  // Find the actual order from the context
  const order = orders.find(o => o.order_number === orderNumber)
  
  // Calculate accurate totals
  const subtotal = order ? order.items.reduce((sum, item) => sum + item.total_price, 0) : 0
  const serviceFee = order ? order.service_fee : 20
  const total = subtotal + serviceFee
  
  // Format order data
  const orderData = order ? {
    orderNumber: order.order_number,
    customerName: order.customer_info ? `${order.customer_info.firstName} ${order.customer_info.lastName}` : 'John Doe',
    email: order.customer_info?.email || 'john.doe@email.com',
    phone: order.customer_info?.phone || '+639123456789',
    items: order.items.map(item => ({
      name: item.item_name,
      quantity: item.quantity,
      price: `₱${item.unit_price}`
    })),
    subtotal: `₱${subtotal.toFixed(2)}`,
    serviceFee: `₱${serviceFee.toFixed(2)}`,
    total: `₱${total.toFixed(2)}`,
    estimatedTime: '15-20 minutes',
    status: order.status,
    orderType: order.order_type
  } : {
    orderNumber: orderNumber || 'KXB123456',
    customerName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+639123456789',
    items: [
      { name: 'Pre‑Workout Espresso', quantity: 2, price: '₱110' },
      { name: 'Protein Mocha', quantity: 1, price: '₱180' }
    ],
    subtotal: '₱400.00',
    serviceFee: '₱20.00',
    total: '₱420.00',
    estimatedTime: '15-20 minutes',
    status: 'confirmed',
    orderType: 'dine_in'
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-check-circle-fill text-success mb-3" style={{ fontSize: '4rem' }}></i>
        <h2 className="display-4 fw-bold mb-4 text-success">Order Confirmed!</h2>
        <p className="lead text-muted">
          Thank you for your order. We're preparing it for you now.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-success">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Order Details
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-muted mb-3">Order Information</h6>
                  <p className="mb-2">
                    <strong>Order Number:</strong> {orderData.orderNumber}
                  </p>
                  <p className="mb-2">
                    <strong>Status:</strong> 
                    <span className="badge bg-success ms-2">Confirmed</span>
                  </p>
                  <p className="mb-2">
                    <strong>Estimated Time:</strong> {orderData.estimatedTime}
                  </p>
                  <p className="mb-2">
                    <strong>Subtotal:</strong> {orderData.subtotal}
                  </p>
                  <p className="mb-2">
                    <strong>Service Fee:</strong> {orderData.serviceFee}
                  </p>
                  <p className="mb-2">
                    <strong>Total Amount:</strong> <span className="text-primary fw-bold">{orderData.total}</span>
                  </p>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted mb-3">Customer Information</h6>
                  <p className="mb-2">
                    <strong>Name:</strong> {orderData.customerName}
                  </p>
                  {orderData.email && (
                    <p className="mb-2">
                      <strong>Email:</strong> {orderData.email}
                    </p>
                  )}
                  <p className="mb-2">
                    <strong>Phone:</strong> {orderData.phone}
                  </p>
                  <p className="mb-2">
                    <strong>Order Type:</strong> {orderData.orderType?.replace('_', ' ').toUpperCase() || 'DINE IN'}
                  </p>
                </Col>
              </Row>

              <hr />

              <h6 className="text-muted mb-3">Order Items</h6>
              {orderData.items.map((item, index) => {
                const unitPrice = parseFloat(item.price.replace('₱', ''))
                const totalPrice = unitPrice * (order?.items[index]?.quantity || 1)
                return (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="fw-bold">₱{totalPrice.toFixed(2)}</span>
                  </div>
                )
              })}

              <hr />

              <Alert variant="info" className="mb-4">
                <i className="bi bi-info-circle me-2"></i>
                <strong>What's Next?</strong><br />
                • You'll receive a confirmation email shortly<br />
                • We'll notify you when your order is ready<br />
                • Please arrive within 30 minutes of notification<br />
                • Show your order number when picking up
              </Alert>

              <Alert variant="warning">
                <i className="bi bi-clock me-2"></i>
                <strong>Pickup Instructions:</strong><br />
                Please arrive at our location within 30 minutes of receiving the "Ready for Pickup" notification. 
                Have your order number ready to show our staff.
              </Alert>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <Link to="/menu">
              <Button variant="primary" size="lg" className="me-3">
                <i className="bi bi-menu-button-wide me-2"></i>
                Order Again
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline-primary" size="lg">
                <i className="bi bi-house me-2"></i>
                Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Order Tracking Section */}
      <Row className="mt-5">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Order Tracking
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-3 text-center mb-3">
                  <div className="p-3">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2 text-success">Order Received</h6>
                    <small className="text-muted">Just now</small>
                  </div>
                </div>
                <div className="col-md-3 text-center mb-3">
                  <div className="p-3">
                    <i className="bi bi-clock text-warning" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2 text-warning">Preparing</h6>
                    <small className="text-muted">In progress</small>
                  </div>
                </div>
                <div className="col-md-3 text-center mb-3">
                  <div className="p-3">
                    <i className="bi bi-hourglass-split text-secondary" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2 text-secondary">Ready</h6>
                    <small className="text-muted">Pending</small>
                  </div>
                </div>
                <div className="col-md-3 text-center mb-3">
                  <div className="p-3">
                    <i className="bi bi-hand-thumbs-up text-secondary" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2 text-secondary">Completed</h6>
                    <small className="text-muted">Pending</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
