import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

type Auth = { isLoggedIn: boolean, login: () => void }

export default function BaristaLogin({ auth }: { auth: Auth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email && password) {
      auth.login()
      navigate('/barista/dashboard', { replace: true })
    }
  }

  return (
    <Form onSubmit={onSubmit} className="p-3 border rounded" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Barista Login</h3>
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="dark" className="w-100">Login</Button>
    </Form>
  )
}


