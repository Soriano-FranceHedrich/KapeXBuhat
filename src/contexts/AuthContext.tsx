import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  zipCode?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  address?: string
  city?: string
  zipCode?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('kape-x-buhat-user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('kape-x-buhat-user')
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('kape-x-buhat-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('kape-x-buhat-user')
    }
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()
      
      // Mock authentication - in real app, validate credentials
      if (email && password) {
        const mockUser: User = {
          id: Date.now(),
          firstName: 'John',
          lastName: 'Doe',
          email: email,
          phone: '+639123456789',
          address: '123 Main St',
          city: 'Manila',
          zipCode: '1000',
          createdAt: new Date().toISOString()
        }
        setUser(mockUser)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // })
      // const data = await response.json()
      
      // Mock registration - in real app, create user account
      const newUser: User = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        zipCode: userData.zipCode,
        createdAt: new Date().toISOString()
      }
      setUser(newUser)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
