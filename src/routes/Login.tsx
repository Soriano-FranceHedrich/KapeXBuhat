import { useState } from 'react'
import { Container, Card, Button, Form, Alert, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        navigate('/')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return formData.email && formData.password
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="text-center mb-4">
            <i className="bi bi-person-circle text-primary mb-3" style={{ fontSize: '4rem' }}></i>
            <h2 className="display-5 fw-bold mb-3">Welcome Back</h2>
            <p className="text-muted">Sign in to your account to continue</p>
          </div>

          <Card className="border-0 shadow-lg">
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" className="mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  size="lg"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/forgot-password" className="text-decoration-none">
                    <small>Forgot your password?</small>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 mt-4">
            <Card.Body className="text-center py-3">
              <p className="mb-0 text-muted">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary fw-bold text-decoration-none">
                  Sign up here
                </Link>
              </p>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <Link to="/" className="text-decoration-none">
              <Button variant="outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
