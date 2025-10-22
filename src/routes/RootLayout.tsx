import { Container, Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import SiteHeader from '../shared/SiteHeader'

export default function RootLayout() {
  return (
    <>
      <SiteHeader />
      <main className="py-4">
        <Container fluid="md">
          <Outlet />
        </Container>
      </main>
      <footer className="bg-light border-top py-5 mt-5">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <div className="text-center text-md-start">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-cup-hot-fill text-primary me-2"></i>
                  Kape X Buhat
                </h5>
                <p className="text-muted">
                  Where coffee culture meets fitness passion. Fuel your hustle with expertly brewed coffee and premium gym amenities.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="text-center text-md-end">
                <h6 className="fw-bold mb-3">Contact Info</h6>
                <div className="d-flex flex-column gap-2">
                  <span className="text-muted">
                    <i className="bi bi-telephone-fill text-primary me-2"></i>
                    0922 357 8453
                  </span>
                  <span className="text-muted">
                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                    sorianofrance71@gmail.com
                  </span>
                  <span className="text-muted">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                    Marinig, Cabuyao, Laguna
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center text-muted">
            <p className="mb-0">
              © {new Date().getFullYear()} Kape X Buhat. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  )
}


