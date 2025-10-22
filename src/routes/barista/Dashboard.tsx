import { Card, Col, Row } from 'react-bootstrap'

const baristas = [
  {
    name: "Maria Santos",
    nickname: "Coffee Queen",
    age: 28,
    location: "Main Branch",
    specialty: "Latte Art",
    experience: "5 years"
  },
  {
    name: "Juan Dela Cruz",
    nickname: "Bean Master",
    age: 32,
    location: "Downtown Branch",
    specialty: "Espresso",
    experience: "7 years"
  },
  {
    name: "Ana Rodriguez",
    nickname: "Caffeine Fairy",
    age: 25,
    location: "Main Branch",
    specialty: "Cold Brew",
    experience: "3 years"
  },
  {
    name: "Carlos Mendoza",
    nickname: "Roast Wizard",
    age: 35,
    location: "Downtown Branch",
    specialty: "Pour Over",
    experience: "8 years"
  }
]

export default function BaristaDashboard() {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {baristas.map((barista, index) => (
        <Col key={index}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-person-circle text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="h5">{barista.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">"{barista.nickname}"</Card.Subtitle>
              
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">
                    <i className="bi bi-calendar-event text-primary me-1"></i>
                    Age: {barista.age}
                  </small>
                  <small className="text-muted">
                    <i className="bi bi-geo-alt text-primary me-1"></i>
                    {barista.location}
                  </small>
                </div>
                
                <div className="mt-2">
                  <small className="text-primary fw-bold">
                    <i className="bi bi-star text-primary me-1"></i>
                    {barista.specialty}
                  </small>
                </div>
                
                <div className="mt-1">
                  <small className="text-primary">
                    <i className="bi bi-clock-history text-primary me-1"></i>
                    {barista.experience}
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}


