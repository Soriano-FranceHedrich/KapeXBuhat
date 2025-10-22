import { useState } from 'react'
import { Container, Card, Button, Form, Alert, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useOrders } from '../contexts/OrderContext'

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const { orders } = useOrders()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSaveProfile = async () => {
    setIsSubmitting(true)
    setError('')
    
    try {
      updateProfile(formData)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelEdit = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      zipCode: user?.zipCode || ''
    })
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'warning', text: 'Pending' },
      confirmed: { bg: 'info', text: 'Confirmed' },
      preparing: { bg: 'info', text: 'Preparing' },
      ready: { bg: 'success', text: 'Ready' },
      completed: { bg: 'secondary', text: 'Completed' },
      cancelled: { bg: 'danger', text: 'Cancelled' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { bg: 'secondary', text: status }
    return <span className={`badge bg-${config.bg}`}>{config.text}</span>
  }

  if (!user) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle text-warning mb-3" style={{ fontSize: '4rem' }}></i>
          <h3>Please log in to view your profile</h3>
          <p className="text-muted">You need to be logged in to access this page.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-person-circle text-primary mb-3" style={{ fontSize: '4rem' }}></i>
        <h2 className="display-5 fw-bold mb-3">My Profile</h2>
        <p className="text-muted">Manage your account and view your order history</p>
      </div>

      <Row>
        <Col lg={12}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'profile')}
            className="mb-4"
          >
            <Tab eventKey="profile" title="Profile Information">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <i className="bi bi-person me-2"></i>
                      Personal Information
                    </h5>
                    {!isEditing && (
                      <Button 
                        variant="light" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {error}
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert variant="success" className="mb-4">
                      <i className="bi bi-check-circle me-2"></i>
                      {success}
                    </Alert>
                  )}

                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>

                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>ZIP Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {isEditing && (
                      <div className="d-flex gap-2 mt-4">
                        <Button 
                          variant="primary" 
                          onClick={handleSaveProfile}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check me-2"></i>
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          onClick={handleCancelEdit}
                        >
                          <i className="bi bi-x me-2"></i>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="orders" title="Order History">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-list-ul me-2"></i>
                    Order History
                  </h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {orders.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-inbox text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                      <h5 className="text-muted">No orders yet</h5>
                      <p className="text-muted">Your order history will appear here once you place an order.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Order #</th>
                            <th>Items</th>
                            <th>Type</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
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
                              </td>
                              <td>
                                <span className="badge bg-secondary">
                                  {order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1).replace('_', ' ')}
                                </span>
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="account" title="Account Settings">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-warning text-dark">
                  <h5 className="mb-0">
                    <i className="bi bi-gear me-2"></i>
                    Account Settings
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="mb-4">
                    <h6>Account Information</h6>
                    <p className="text-muted mb-2">
                      <strong>Member since:</strong> {formatDate(user.createdAt)}
                    </p>
                    <p className="text-muted mb-2">
                      <strong>Account ID:</strong> #{user.id}
                    </p>
                    <p className="text-muted mb-0">
                      <strong>Account status:</strong> 
                      <span className="badge bg-success ms-2">Active</span>
                    </p>
                  </div>

                  <hr />

                  <div className="mb-4">
                    <h6>Danger Zone</h6>
                    <p className="text-muted mb-3">
                      Once you log out, you'll need to log in again to access your account.
                    </p>
                    <Button 
                      variant="outline-danger"
                      onClick={logout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Log Out
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}
