import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container>
      <section className="hero-section text-center fade-in-up">
        <div className="mb-4">
          <i className="bi bi-cup-hot-fill text-primary" style={{ fontSize: '4rem' }}></i>
        </div>
        <h1 className="display-3 fw-bold mb-4">Kape X Buhat</h1>
        <p className="lead fs-4 mb-5 text-muted">
          Where coffee meets fitness. Fuel your hustle with expertly brewed coffee and premium gym amenities.
        </p>
        
        <div className="d-flex gap-3 justify-content-center flex-wrap mb-5">
          <Link to="/menu">
            <Button variant="primary" size="lg">
              <i className="bi bi-menu-button-wide me-2"></i>
              See Menu
            </Button>
          </Link>
          <Link to="/amenities">
            <Button variant="outline-primary" size="lg">
              <i className="bi bi-gear-fill me-2"></i>
              View Amenities
            </Button>
          </Link>
          <Link to="/locations">
            <Button variant="outline-primary" size="lg">
              <i className="bi bi-geo-alt-fill me-2"></i>
              Find Us
            </Button>
          </Link>
        </div>

        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <div className="p-4">
              <i className="bi bi-cup-hot text-primary" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-3 mb-2">Premium Coffee</h5>
              <p className="text-muted">Expertly crafted beverages to fuel your day</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="p-4">
              <i className="bi bi-heart-pulse text-primary" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-3 mb-2">Fitness Focus</h5>
              <p className="text-muted">State-of-the-art gym equipment and facilities</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="p-4">
              <i className="bi bi-people-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-3 mb-2">Community</h5>
              <p className="text-muted">Join our vibrant fitness and coffee community</p>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  )
}


