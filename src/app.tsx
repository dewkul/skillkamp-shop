import './app.css'
import { Banner, FooterApp, Nav } from './components/shared'
import { AuthProvider } from './hooks/useAuth'
import Routes from './router'

export function App() {

  return (
    <>
      <Banner />
      <AuthProvider>
        <Nav />
        <Routes />
      </AuthProvider>
      <FooterApp />
    </>
  )
}
