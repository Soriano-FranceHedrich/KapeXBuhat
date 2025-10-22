import { useState } from 'react'
import { Container, Card, Button, Row, Col, Form, Alert, ListGroup, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useOrders } from '../contexts/OrderContext'

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  paymentMethod: string
  orderType: 'dine_in' | 'takeout' | 'delivery'
  specialInstructions: string
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cash',
    orderType: 'dine_in',
    specialInstructions: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate order number
    const newOrderNumber = `KXB${Date.now().toString().slice(-6)}`
    setOrderNumber(newOrderNumber)
    
    // Show confirmation modal
    setShowConfirmation(true)
  }

  const handleConfirmOrder = () => {
    // Generate a unique order ID
    const orderId = Date.now()
    
    // Create order data matching database schema
    const newOrder = {
      order_id: orderId,
      order_number: orderNumber,
      total_amount: getTotalPrice(),
      service_fee: 20, // Fixed service fee
      status: 'pending' as const,
      order_type: formData.orderType,
      special_instructions: formData.specialInstructions,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 1, // Temporary user ID
      customer_info: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || undefined,
        phone: formData.phone,
        address: formData.address || undefined,
        city: formData.city || undefined,
        zipCode: formData.zipCode || undefined,
        paymentMethod: formData.paymentMethod
      },
      items: cartItems.map((item, index) => ({
        order_item_id: orderId + index + 1, // Unique item ID
        order_id: orderId, // Same order ID for all items
        item_id: parseInt(item.id.replace(/\D/g, '')) || Math.floor(Math.random() * 1000), // Extract number from ID or generate random
        quantity: item.quantity,
        unit_price: parseFloat(item.price.replace('₱', '')),
        total_price: parseFloat(item.price.replace('₱', '')) * item.quantity,
        item_name: item.name,
        item_image: item.image
      }))
    }
    
    // Add order to OrderContext
    addOrder(newOrder)
    
    // In a real app, this would send data to backend API
    console.log('Order submitted to database:', newOrder)
    
    // Clear cart after successful order
    clearCart()
    
    // Navigate to order confirmation page
    navigate(`/order-confirmation/${orderNumber}`)
  }

  const isFormValid = () => {
    const baseValid = formData.firstName && formData.lastName && formData.phone
    
    if (formData.orderType === 'dine_in') {
      return baseValid
    } else {
      // For takeout and delivery, require address fields
      return baseValid && formData.email && formData.address && formData.city && formData.zipCode
    }
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-credit-card text-primary mb-3" style={{ fontSize: '3rem' }}></i>
        <h2 className="display-4 fw-bold mb-4">Checkout</h2>
        <p className="lead text-muted">
          Complete your order and we'll prepare it for you
        </p>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-person-fill me-2"></i>
                Customer Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email {formData.orderType !== 'dine_in' && '*'}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={formData.orderType === 'dine_in' ? 'Optional for dine-in' : 'Required'}
                        required={formData.orderType !== 'dine_in'}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {formData.orderType !== 'dine_in' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Address *</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>City *</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>ZIP Code *</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="gcash">GCash</option>
                    <option value="paymaya">PayMaya</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Order Type</Form.Label>
                  <Form.Select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                  >
                    <option value="dine_in">Dine In</option>
                    <option value="takeout">Takeout</option>
                    <option value="delivery">Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Special Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes for your order..."
                  />
                </Form.Group>
              </Form>
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
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex align-items-center px-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="fw-bold">{item.name}</div>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">₱{parseInt(item.price.replace('₱', '')) * item.quantity}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <hr />
              
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
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                <i className="bi bi-check-circle me-2"></i>
                Place Order
              </Button>
              
              <Link to="/cart" className="d-block text-center mt-3">
                <Button variant="outline-secondary" className="w-100">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Cart
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-check-circle text-success me-2"></i>
            Confirm Your Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info" className="mb-4">
            <strong>Order Number:</strong> {orderNumber}<br />
            <strong>Total Items:</strong> {getTotalItems()} items<br />
            <strong>Subtotal:</strong> ₱{getTotalPrice().toFixed(2)}<br />
            <strong>Service Fee:</strong> ₱20.00<br />
            <strong>Total Amount:</strong> ₱{(getTotalPrice() + 20).toFixed(2)}
          </Alert>
          
          <div className="mb-3">
            <h6>Customer Information:</h6>
            <p className="mb-1">
              <strong>Name:</strong> {formData.firstName} {formData.lastName}<br />
              {formData.email && <><strong>Email:</strong> {formData.email}<br /></>}
              <strong>Phone:</strong> {formData.phone}<br />
              {formData.orderType !== 'dine_in' && formData.address && (
                <><strong>Address:</strong> {formData.address}, {formData.city} {formData.zipCode}<br /></>
              )}
              <strong>Order Type:</strong> {formData.orderType.replace('_', ' ').toUpperCase()}<br />
              <strong>Payment:</strong> {formData.paymentMethod.replace('_', ' ').toUpperCase()}
            </p>
          </div>

          <div className="mb-3">
            <h6>Order Items:</h6>
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                <span>{item.name} x{item.quantity}</span>
                <span className="fw-bold">₱{(parseFloat(item.price.replace('₱', '')) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {formData.specialInstructions && (
            <div className="mb-3">
              <h6>Special Instructions:</h6>
              <p className="text-muted">{formData.specialInstructions}</p>
            </div>
          )}

          <Alert variant="success">
            <i className="bi bi-info-circle me-2"></i>
            Your order will be prepared and ready for {formData.orderType === 'dine_in' ? 'dine-in' : formData.orderType === 'takeout' ? 'pickup' : 'delivery'}. 
            {formData.email && ' You\'ll receive a confirmation email shortly.'}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmOrder}>
            <i className="bi bi-check-circle me-2"></i>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
