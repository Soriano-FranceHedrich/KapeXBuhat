import { Container, Row, Col, Card } from 'react-bootstrap'

export default function Locations() {
  return (
    <Container>
      <section className="py-5">
        <div className="text-center mb-5">
          <i className="bi bi-geo-alt-fill text-primary mb-3" style={{ fontSize: '3rem' }}></i>
          <h2 className="display-4 fw-bold mb-4">Our Location</h2>
          <p className="lead text-muted">
            Visit us at our flagship location
          </p>
        </div>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5 text-center">
                <div className="mb-4">
                  <i className="bi bi-building text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h4 className="fw-bold mb-3">Marinig Cabuyao Laguna</h4>
                  <p className="fs-5 text-muted mb-4">
                    Our flagship location where coffee culture meets fitness passion
                  </p>
                </div>
                
                <div className="row g-4">
                  <Col md={6}>
                    <div className="p-3">
                      <i className="bi bi-clock-fill text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                      <h6 className="fw-bold">Operating Hours</h6>
                      <p className="text-muted mb-0">Open Everyday</p>
                      <p className="text-muted">6:00 AM - 10:00 PM</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3">
                      <i className="bi bi-telephone-fill text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                      <h6 className="fw-bold">Contact</h6>
                      <p className="text-muted mb-0">0922 357 8453</p>
                      <p className="text-muted">sorianofrance71@gmail.com</p>
                    </div>
                  </Col>
                </div>

                <div className="mt-4">
                  <i className="bi bi-map-fill text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                  <h6 className="fw-bold">Address</h6>
                  <p className="text-muted">
                    Marinig, Cabuyao, Laguna<br />
                    Philippines
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="bi bi-cup-hot text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mb-3">Coffee Bar</h5>
                <p className="text-muted">
                  Premium coffee and beverages crafted by our expert baristas
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="bi bi-dumbbell text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mb-3">Fitness Center</h5>
                <p className="text-muted">
                  State-of-the-art equipment and facilities for all fitness levels
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="bi bi-people-fill text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mb-3">Community Space</h5>
                <p className="text-muted">
                  A welcoming environment for fitness enthusiasts and coffee lovers
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}


