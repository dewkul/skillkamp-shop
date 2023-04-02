import './app.css'
import { Banner, FooterApp, Nav } from './components/shared'
import Routes from './router'

export function App() {

  return (
    <>
      <Banner />
      <Nav />
      <Routes />
      <FooterApp />
    </>
  )
}
