import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

import { CartProvider } from './contexts/CartContext'
import { OrderProvider } from './contexts/OrderContext'
import { AuthProvider } from './contexts/AuthContext'
import RootLayout from './routes/RootLayout'
import Home from './routes/Home'
import About from './routes/About'
import Menu from './routes/Menu'
import Locations from './routes/Locations'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'
import Amenities from './routes/Amenities'
import Gallery from './routes/Gallery'
import Cart from './routes/Cart'
import Checkout from './routes/Checkout'
import OrderConfirmation from './routes/OrderConfirmation'
import Login from './routes/Login'
import Register from './routes/Register'
import Profile from './routes/Profile'
import Orders from './routes/Orders'
import BaristaLayout from './routes/barista/BaristaLayout'
import BaristaDashboard from './routes/barista/Dashboard'
import DrinkDetails from './routes/DrinkDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'menu', element: <Menu /> },
      { path: 'menu/:drinkId', element: <DrinkDetails /> },
      { path: 'locations', element: <Locations /> },
      { path: 'amenities', element: <Amenities /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order-confirmation/:orderNumber', element: <OrderConfirmation /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path: 'orders', element: <Orders /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'barista',
        element: <BaristaLayout />,
        children: [
          { index: true, element: <BaristaDashboard /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RouterProvider router={router} />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
