import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function BaristaLayout() {
  return (
    <Container>
      <section className="py-4">
        <h2 className="text-center mb-5">Meet Our Baristas</h2>
        <Outlet />
      </section>
    </Container>
  )
}


