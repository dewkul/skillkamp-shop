import './app.css'
import { Banner, FooterApp, Nav } from './components/shared'
import { AuthProvider } from './hooks/useAuth'
import { ProductProvider } from './hooks/useProduct'
import { CartProvider } from './hooks/useCart'
import Routes from './router'
import { Toaster } from 'react-hot-toast'
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react'

export function App() {
  const theme: CustomFlowbiteTheme = {
    button: {
      base: "primary-700",
      color: {
        primary: "primary-700"
      }
    }
  }


  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={true}
      />
      <Flowbite theme={theme}>
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
      </Flowbite>
    </>
  )
}
