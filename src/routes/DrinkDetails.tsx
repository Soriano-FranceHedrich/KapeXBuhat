import { useParams } from 'react-router-dom'
import { Card, Container, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { drinks } from './Menu'
import { useCart } from '../contexts/CartContext'

export default function DrinkDetails() {
  const { drinkId } = useParams()
  const drink = drinks.find(d => d.id === drinkId)
  const { addToCart } = useCart()

  const handleAddToOrder = () => {
    if (drink) {
      addToCart({
        id: drink.id,
        name: drink.name,
        price: drink.price,
        image: drink.image
      })
    }
  }
  
  if (!drink) {
    return (
      <Container>
        <div className="text-center py-5">
          <i className="bi bi-exclamation-triangle text-primary mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>Drink Not Found</h3>
          <p className="text-muted">The drink you're looking for doesn't exist.</p>
          <Link to="/menu">
            <Button variant="primary">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Menu
            </Button>
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-4">
        <div className="text-center mb-4">
          <Link to="/menu">
            <Button variant="outline-primary" className="mb-3">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Menu
            </Button>
          </Link>
        </div>
        
        <Card className="border-0 shadow-lg">
          <Row className="g-0">
            <Col md={6}>
              <Card.Img 
                src={drink.image} 
                alt={drink.name} 
                loading="lazy"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Col>
            <Col md={6}>
              <Card.Body className="p-5 d-flex flex-column justify-content-center">
                <div className="mb-3">
                  <i className="bi bi-cup-hot-fill text-primary me-2" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-muted">Premium Beverage</span>
                </div>
                
                <Card.Title className="display-5 fw-bold mb-3">{drink.name}</Card.Title>
                
                <div className="mb-4">
                  <span className="text-primary fw-bold fs-2">{drink.price}</span>
                </div>
                
                <Card.Text className="fs-5 text-muted mb-4">{drink.desc}</Card.Text>
                
                <div className="mt-auto">
                  <div className="d-flex gap-3">
                    <Button variant="primary" size="lg" className="flex-fill" onClick={handleAddToOrder}>
                      <i className="bi bi-cart-plus me-2"></i>
                      Add to Order
                    </Button>
                    <Button variant="outline-primary" size="lg" className="flex-fill">
                      <i className="bi bi-heart me-2"></i>
                      Add to Favorites
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  )
}


