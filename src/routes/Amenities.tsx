import { useState } from 'react'
import { Card, Col, Row, Button, Modal, Form, Container, Alert, Badge } from 'react-bootstrap'

const items = [
  { 
    title: 'Power Rack Zone', 
    desc: 'Squat, bench, deadlift platforms.',
    image: '/images/amenities/Power Rack Zone.jpg',
    capacity: 4,
    hourlyRate: '₱200'
  },
  { 
    title: 'Dumbbells up to 50kg', 
    desc: 'Heavy sets welcome.',
    image: '/images/amenities/Dumbbells up to 50kg.jpg',
    capacity: 8,
    hourlyRate: '₱150'
  },
  { 
    title: 'Conditioning Corner', 
    desc: 'Assault bike, rower, jump ropes.',
    image: '/images/amenities/Conditioning Corner.webp',
    capacity: 6,
    hourlyRate: '₱180'
  },
  { 
    title: 'Stretch & Mobility', 
    desc: 'Bands, mats, foam rollers.',
    image: '/images/amenities/Stretch & Mobility.jpg',
    capacity: 10,
    hourlyRate: '₱100'
  },
  { 
    title: 'Showers & Lockers', 
    desc: 'Clean facilities with towels.',
    image: '/images/amenities/Showers & Lockers.jpg',
    capacity: 12,
    hourlyRate: '₱50'
  },
  { 
    title: 'Recovery Bar', 
    desc: 'Protein shakes and electrolytes.',
    image: '/images/amenities/Recovery Bar.jpg',
    capacity: 15,
    hourlyRate: '₱120'
  },
]

export default function Amenities() {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    duration: '1',
    name: '',
    email: '',
    phone: ''
  })
  const [scheduledSlots, setScheduledSlots] = useState<Array<{
    amenity: string,
    date: string,
    time: string,
    duration: string,
    name: string
  }>>([])

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSlot = {
      amenity: 'Gym Session',
      date: scheduleForm.date,
      time: scheduleForm.time,
      duration: scheduleForm.duration,
      name: scheduleForm.name
    }
    setScheduledSlots([...scheduledSlots, newSlot])
    setScheduleForm({
      date: '',
      time: '',
      duration: '1',
      name: '',
      email: '',
      phone: ''
    })
    setShowScheduleModal(false)
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-gear-fill text-primary mb-3" style={{ fontSize: '3rem' }}></i>
        <h2 className="display-4 fw-bold mb-4">Gym Amenities</h2>
        <p className="lead text-muted">
          Explore our premium gym facilities and equipment
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => setShowScheduleModal(true)}
          className="mt-3"
        >
          <i className="bi bi-calendar-plus me-2"></i>
          Schedule Gym Session
        </Button>
      </div>

      <Row xs={1} md={3} className="g-4">
        {items.map((it) => (
          <Col key={it.title}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img 
                variant="top" 
                src={it.image} 
                alt={it.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{it.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">{it.desc}</Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Capacity: {it.capacity}</small>
                    <Badge bg="success">{it.hourlyRate}/hr</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Schedule Modal */}
      <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-calendar-plus me-2"></i>
            Schedule Gym Session
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info" className="mb-4">
            <strong>Gym Session Booking</strong><br />
            Book your gym session and access all our premium facilities including Power Rack Zone, Dumbbells, Conditioning Corner, and more.
          </Alert>
          
          <Form onSubmit={handleScheduleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (hours)</Form.Label>
                  <Form.Select
                    value={scheduleForm.duration}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                    required
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={scheduleForm.name}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={scheduleForm.email}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, email: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={scheduleForm.phone}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, phone: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            {scheduleForm.date && scheduleForm.time && (
              <Alert variant="success" className="mt-3">
                <strong>Booking Summary:</strong><br />
                Gym Session on {scheduleForm.date} at {scheduleForm.time}<br />
                Duration: {scheduleForm.duration} hour(s)<br />
                Total Cost: ₱{200 * parseInt(scheduleForm.duration)} (₱200/hour)
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleScheduleSubmit}
            disabled={!scheduleForm.date || !scheduleForm.time || !scheduleForm.name || !scheduleForm.email || !scheduleForm.phone}
          >
            <i className="bi bi-calendar-check me-2"></i>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Scheduled Sessions */}
      {scheduledSlots.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-4">
            <i className="bi bi-calendar-check me-2"></i>
            Your Scheduled Sessions
          </h4>
          <Row>
            {scheduledSlots.map((slot, index) => (
              <Col md={6} lg={4} key={index} className="mb-3">
                <Card className="border-success">
                  <Card.Body>
                    <Card.Title className="text-success">{slot.amenity}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {slot.date}<br />
                      <strong>Time:</strong> {slot.time}<br />
                      <strong>Duration:</strong> {slot.duration} hour(s)<br />
                      <strong>Booked by:</strong> {slot.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  )
}


