import { Card, Col, Row, Container } from 'react-bootstrap'

export default function Contact() {
  return (
    <Container>
      <section className="py-4">
        <h2 className="text-center mb-5">Contact Us</h2>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <i className="bi bi-telephone-fill text-primary" style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-3 mb-2">Phone</h4>
                  <p className="text-muted mb-0">0922 357 8453</p>
                </div>
                
                <hr className="my-4" />
                
                <div className="text-center">
                  <i className="bi bi-envelope-fill text-primary" style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-3 mb-2">Email</h4>
                  <p className="text-muted mb-0">sorianofrance71@gmail.com</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <i className="bi bi-geo-alt-fill text-primary" style={{ fontSize: '2rem' }}></i>
            <h5 className="mt-3">Location</h5>
            <p className="text-muted">Visit us at our gym cafe location</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <i className="bi bi-clock-fill text-primary" style={{ fontSize: '2rem' }}></i>
            <h5 className="mt-3">Hours</h5>
            <p className="text-muted">Mon-Sun: 6:00 AM - 10:00 PM</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <i className="bi bi-chat-dots-fill text-primary" style={{ fontSize: '2rem' }}></i>
            <h5 className="mt-3">Support</h5>
            <p className="text-muted">We're here to help you!</p>
          </Col>
        </Row>
      </section>
    </Container>
  )
}


