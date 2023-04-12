import './app.css'
import { Banner, FooterApp, Nav } from './components/shared'
import { AuthProvider } from './hooks/useAuth'
import { ProductProvider } from './hooks/useProduct'
import { CartProvider } from './hooks/useCart'
import Routes from './router'
import { Toaster } from 'react-hot-toast'

export function App() {

  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={true}
      />
      <Banner />
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <Nav />
            <Routes />
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
      <FooterApp />
    </>
  )
}
