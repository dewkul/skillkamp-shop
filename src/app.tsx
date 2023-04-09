import './app.css'
import { Banner, FooterApp, Nav } from './components/shared'
import { AuthProvider } from './hooks/useAuth'
import { ProductProvider } from './hooks/useProduct'
import Routes from './router'

export function App() {

  return (
    <>
      <Banner />
      <AuthProvider>
        <Nav />
        <ProductProvider>
          <Routes />
        </ProductProvider>
      </AuthProvider>
      <FooterApp />
    </>
  )
}
