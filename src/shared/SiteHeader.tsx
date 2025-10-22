import { Container, Nav, Navbar, Badge, Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

export default function SiteHeader() {
  const { getTotalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const cartItemCount = getTotalItems()
  
  return (
    <Navbar expand="md" className="navbar-custom" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="brand-custom">
          <i className="bi bi-cup-hot-fill me-2"></i>
          <span className="d-none d-sm-inline">Kape X Buhat</span>
          <span className="d-inline d-sm-none">KX Buhat</span>
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="kx-nav" 
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#kx-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list text-primary" style={{ fontSize: '1.5rem' }}></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="kx-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom">
              <i className="bi bi-house-fill me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-custom">
              <i className="bi bi-info-circle-fill me-1"></i>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menu" className="nav-link-custom">
              <i className="bi bi-menu-button-wide me-1"></i>
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/amenities" className="nav-link-custom">
              <i className="bi bi-gear-fill me-1"></i>
              Amenities
            </Nav.Link>
            <Nav.Link as={NavLink} to="/gallery" className="nav-link-custom">
              <i className="bi bi-images me-1"></i>
              Gallery
            </Nav.Link>
            <Nav.Link as={NavLink} to="/locations" className="nav-link-custom">
              <i className="bi bi-geo-alt-fill me-1"></i>
              Locations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link-custom">
              <i className="bi bi-telephone-fill me-1"></i>
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" className="nav-link-custom position-relative">
              <i className="bi bi-cart-fill me-1"></i>
              Cart
              {cartItemCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: '0.7rem', minWidth: '18px', height: '18px' }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.firstName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/profile">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/orders">
                    <i className="bi bi-list-ul me-2"></i>
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="nav-link-custom">
                  <i className="bi bi-person-plus me-1"></i>
                  Register
                </Nav.Link>
              </>
            )}
            
            <Nav.Link as={NavLink} to="/barista" className="nav-link-custom barista-link">
              <i className="bi bi-person-badge-fill me-1"></i>
              Our Baristas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


