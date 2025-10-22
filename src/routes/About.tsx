import { Container, Row, Col, Card } from 'react-bootstrap'

export default function About() {
  return (
    <Container>
      <section className="py-5">
        <div className="text-center mb-5">
          <i className="bi bi-heart-pulse text-primary mb-3" style={{ fontSize: '3rem' }}></i>
          <h2 className="display-4 fw-bold mb-4">About Kape X Buhat</h2>
          <p className="lead text-muted">
            Where coffee culture meets fitness passion
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <p className="fs-5 text-center mb-4">
                  Kape X Buhat is a unique fusion of a coffee shop and fitness space designed for individuals who value both energy and wellness. We believe that great workouts start with great coffee — that's why we serve premium brews crafted to fuel your body and mind.
                </p>
                <p className="fs-5 text-center">
                  Whether you're here to lift weights, unwind with friends, or simply enjoy a perfect cup of coffee, Kape X Buhat offers an inspiring atmosphere where passion for fitness meets the love of coffee. Our mission is to energize your day, one rep and one sip at a time.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="bi bi-cup-hot-fill text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mb-3">Premium Coffee</h5>
                <p className="text-muted">
                  Expertly sourced beans roasted to perfection, crafted by skilled baristas who understand the art of coffee making.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="bi bi-dumbbell text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mb-3">Fitness Focus</h5>
                <p className="text-muted">
                  State-of-the-art equipment and facilities designed to support your fitness journey, from beginner to advanced levels.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="bi bi-people-fill text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mb-3">Community</h5>
                <p className="text-muted">
                  A welcoming space where fitness enthusiasts and coffee lovers come together to share their passions and support each other.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}


