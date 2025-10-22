import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, we couldn’t find that page.</p>
      <Link to="/" className="btn btn-dark">Go Home</Link>
    </div>
  )
}


