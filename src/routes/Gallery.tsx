import { useState } from 'react'
import { Card, Col, Row, Button, Modal, Form, Container } from 'react-bootstrap'
import { drinks } from './Menu'

const amenitiesImages = [
  { 
    title: 'Power Rack Zone', 
    desc: 'Squat, bench, deadlift platforms.',
    image: '/images/amenities/Power Rack Zone.jpg'
  },
  { 
    title: 'Dumbbells up to 50kg', 
    desc: 'Heavy sets welcome.',
    image: '/images/amenities/Dumbbells up to 50kg.jpg'
  },
  { 
    title: 'Conditioning Corner', 
    desc: 'Assault bike, rower, jump ropes.',
    image: '/images/amenities/Conditioning Corner.webp'
  },
  { 
    title: 'Stretch & Mobility', 
    desc: 'Bands, mats, foam rollers.',
    image: '/images/amenities/Stretch & Mobility.jpg'
  },
  { 
    title: 'Showers & Lockers', 
    desc: 'Clean facilities with towels.',
    image: '/images/amenities/Showers & Lockers.jpg'
  },
  { 
    title: 'Recovery Bar', 
    desc: 'Protein shakes and electrolytes.',
    image: '/images/amenities/Recovery Bar.jpg'
  },
]

export default function Gallery() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<Array<{id: string, title: string, desc: string, image: string}>>([])
  const [uploadForm, setUploadForm] = useState({ title: '', desc: '', file: null as File | null })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadForm({ ...uploadForm, file })
    }
  }

  const handleUpload = () => {
    if (uploadForm.title && uploadForm.desc && uploadForm.file) {
      const newImage = {
        id: `uploaded-${Date.now()}`,
        title: uploadForm.title,
        desc: uploadForm.desc,
        image: URL.createObjectURL(uploadForm.file)
      }
      setUploadedImages([...uploadedImages, newImage])
      setUploadForm({ title: '', desc: '', file: null })
      setShowUploadModal(false)
    }
  }

  const allImages = [
    ...drinks.map(drink => ({
      id: drink.id,
      title: drink.name,
      desc: drink.desc,
      image: drink.image,
      category: 'drinks'
    })),
    ...amenitiesImages.map(amenity => ({
      id: amenity.title.toLowerCase().replace(/\s+/g, '-'),
      title: amenity.title,
      desc: amenity.desc,
      image: amenity.image,
      category: 'amenities'
    })),
    ...uploadedImages.map(img => ({
      ...img,
      category: 'uploaded'
    }))
  ]

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-images text-primary mb-3" style={{ fontSize: '3rem' }}></i>
        <h2 className="display-4 fw-bold mb-4">Gallery</h2>
        <p className="lead text-muted">
          Explore our drinks, amenities, and community photos
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => setShowUploadModal(true)}
          className="mt-3"
        >
          <i className="bi bi-cloud-upload me-2"></i>
          Upload Photo
        </Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {allImages.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold mb-2">{item.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">{item.desc}</Card.Text>
                <div className="mt-auto">
                  <span className={`badge ${
                    item.category === 'drinks' ? 'bg-primary' : 
                    item.category === 'amenities' ? 'bg-success' : 
                    'bg-secondary'
                  }`}>
                    {item.category === 'drinks' ? 'Drink' : 
                     item.category === 'amenities' ? 'Amenity' : 
                     'Community'}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-cloud-upload me-2"></i>
            Upload Photo to Gallery
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Photo Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter photo title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your photo"
                value={uploadForm.desc}
                onChange={(e) => setUploadForm({ ...uploadForm, desc: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Choose Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Form.Group>
            
            {uploadForm.file && (
              <div className="mb-3">
                <img 
                  src={URL.createObjectURL(uploadForm.file)} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  className="border rounded"
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpload}
            disabled={!uploadForm.title || !uploadForm.desc || !uploadForm.file}
          >
            <i className="bi bi-cloud-upload me-2"></i>
            Upload Photo
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
