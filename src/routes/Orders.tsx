import { Container, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useOrders } from '../contexts/OrderContext'

export default function Orders() {
  const { user, isAuthenticated } = useAuth()
  const { orders } = useOrders()

  if (!isAuthenticated || !user) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle text-warning mb-3" style={{ fontSize: '4rem' }}></i>
          <h3>Please log in to view your orders</h3>
          <p className="text-muted">You need to be logged in to access this page.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-list-ul text-primary mb-3" style={{ fontSize: '4rem' }}></i>
        <h2 className="display-5 fw-bold mb-3">My Orders</h2>
        <p className="text-muted">View and track your order history</p>
      </div>

      {orders.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <i className="bi bi-inbox text-muted mb-3" style={{ fontSize: '4rem' }}></i>
            <h4 className="text-muted">No orders yet</h4>
            <p className="text-muted mb-4">Your order history will appear here once you place an order.</p>
            <Alert variant="info">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Tip:</strong> Browse our menu and add items to your cart to place your first order!
            </Alert>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">
              <i className="bi bi-list-ul me-2"></i>
              Order History ({orders.length} orders)
            </h5>
          </Card.Header>
          <Card.Body className="p-0">
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
                        {order.special_instructions && (
                          <div className="text-muted small mt-1">
                            <i className="bi bi-chat-text me-1"></i>
                            {order.special_instructions}
                          </div>
                        )}
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
                        <span className={`badge bg-${
                          order.status === 'pending' ? 'warning' :
                          order.status === 'confirmed' ? 'info' :
                          order.status === 'preparing' ? 'info' :
                          order.status === 'ready' ? 'success' :
                          order.status === 'completed' ? 'secondary' :
                          'danger'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="small text-muted">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}
