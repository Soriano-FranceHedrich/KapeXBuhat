import { Card, Col, Row, Badge } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

type Drink = { id: string, name: string, desc: string, price: string, image: string, category: 'drink' | 'food' }

const menuItems: Drink[] = [
  {
    id: 'preworkout-espresso',
    name: 'Pre‑Workout Espresso',
    desc: 'Two shots to kickstart your set.',
    price: '₱110',
    image: '/images/Pre‑Workout Espresso.jpg',
    category: 'drink'
  },
  {
    id: 'deadlift-dark-roast',
    name: 'Deadlift Dark Roast',
    desc: 'Heavy-bodied, chocolate finish.',
    price: '₱140',
    image: '/images/Deadlift Dark Roast.jpg',
    category: 'drink'
  },
  {
    id: 'latte-lunges',
    name: 'Latte Lunges',
    desc: 'Silky microfoam with a caramel stretch.',
    price: '₱150',
    image: '/images/Latte Lunges.jpg',
    category: 'drink'
  },
  {
    id: 'protein-mocha',
    name: 'Protein Mocha',
    desc: 'Whey‑boosted chocolate latte.',
    price: '₱180',
    image: '/images/Protein Mocha.jpg',
    category: 'drink'
  },
  {
    id: 'cardio-cold-brew',
    name: 'Cardio Cold Brew',
    desc: 'Slow‑steeped, low acid, long‑lasting energy.',
    price: '₱160',
    image: '/images/Cardio Cold Brew.jpg',
    category: 'drink'
  },
  {
    id: 'hiit-hazelnut',
    name: 'HIIT Hazelnut',
    desc: 'Nutty sweetness with quick intensity.',
    price: '₱150',
    image: '/images/HIIT Hazelnut.jpg',
    category: 'drink'
  },
  {
    id: 'recovery-matcha',
    name: 'Recovery Matcha',
    desc: 'Smooth green lift for cooldowns.',
    price: '₱170',
    image: '/images/Recovery Matcha.jpg',
    category: 'drink'
  },
  {
    id: 'pumpkin-pump-latte',
    name: 'Pumpkin Pump Latte',
    desc: 'Seasonal spice to power your reps.',
    price: '₱165',
    image: '/images/Pumpkin Pump Latte.jpg',
    category: 'drink'
  },
  // Food items - Using actual uploaded images with correct extensions
  {
    id: 'protein-power-bowl',
    name: 'Protein Power Bowl',
    desc: 'Grilled chicken, quinoa, and fresh vegetables.',
    price: '₱280',
    image: '/images/Protein Power Bowl.jpg',
    category: 'food'
  },
  {
    id: 'muscle-builder-sandwich',
    name: 'Muscle Builder Sandwich',
    desc: 'Turkey, avocado, and whole grain bread.',
    price: '₱220',
    image: '/images/Muscle Builder Sandwich.jpg',
    category: 'food'
  },
  {
    id: 'energy-boost-salad',
    name: 'Energy Boost Salad',
    desc: 'Mixed greens, nuts, and lean protein.',
    price: '₱190',
    image: '/images/Energy Boost Salad.webp',
    category: 'food'
  },
  {
    id: 'post-workout-wrap',
    name: 'Post-Workout Wrap',
    desc: 'Grilled salmon, brown rice, and vegetables.',
    price: '₱250',
    image: '/images/Post-Workout Wrap.webp',
    category: 'food'
  },
  {
    id: 'fitness-smoothie-bowl',
    name: 'Fitness Smoothie Bowl',
    desc: 'Acai bowl with granola and fresh fruits.',
    price: '₱200',
    image: '/images/Fitness Smoothie Bowl.jpg',
    category: 'food'
  },
  {
    id: 'lean-protein-pasta',
    name: 'Lean Protein Pasta',
    desc: 'Whole wheat pasta with chicken and vegetables.',
    price: '₱240',
    image: '/images/Lean Protein Pasta.jpg',
    category: 'food'
  }
]

export default function Menu() {
  // Separate drinks and food
  const drinks = menuItems.filter(item => item.category === 'drink')
  const food = menuItems.filter(item => item.category === 'food')

  return (
    <section className="py-5">
      <div className="text-center mb-5">
        <i className="bi bi-cup-hot-fill text-primary mb-3" style={{ fontSize: '3rem' }}></i>
        <h2 className="display-4 fw-bold mb-4">Our Menu</h2>
        <p className="lead text-muted">
          Fuel your fitness journey with our expertly crafted beverages and nutritious meals
        </p>
      </div>

      {/* Drinks Section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3">
            <i className="bi bi-cup-hot text-primary me-2"></i>
            Beverages
          </h3>
          <p className="text-muted">Expertly crafted drinks to fuel your workout</p>
        </div>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {drinks.map((d) => (
            <Col key={d.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img 
                  src={d.image} 
                  alt={d.name} 
                  loading="lazy"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="primary" className="mb-2">
                      Drink
                    </Badge>
                    <span className="text-primary fw-bold fs-5">{d.price}</span>
                  </div>
                  <Card.Title className="fw-bold mb-3">{d.name}</Card.Title>
                  <Card.Text className="text-muted mb-3 flex-grow-1">{d.desc}</Card.Text>
                  <Card.Link 
                    as={Link} 
                    to={`/menu/${d.id}`}
                    className="btn btn-outline-primary btn-sm align-self-start"
                  >
                    <i className="bi bi-eye me-1"></i>
                    View Details
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Food Section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3">
            <i className="bi bi-egg-fried text-success me-2"></i>
            Food & Meals
          </h3>
          <p className="text-muted">Nutritious meals to complement your fitness journey</p>
        </div>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {food.map((f) => (
            <Col key={f.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img 
                  src={f.image} 
                  alt={f.name} 
                  loading="lazy"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="success" className="mb-2">
                      Food
                    </Badge>
                    <span className="text-primary fw-bold fs-5">{f.price}</span>
                  </div>
                  <Card.Title className="fw-bold mb-3">{f.name}</Card.Title>
                  <Card.Text className="text-muted mb-3 flex-grow-1">{f.desc}</Card.Text>
                  <Card.Link 
                    as={Link} 
                    to={`/menu/${f.id}`}
                    className="btn btn-outline-primary btn-sm align-self-start"
                  >
                    <i className="bi bi-eye me-1"></i>
                    View Details
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
      <div className="mt-5">
        <Outlet />
      </div>
    </section>
  )
}

export { menuItems as drinks }


