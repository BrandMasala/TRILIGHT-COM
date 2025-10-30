import { NavBar } from '../components/NavBar'
import { Hero } from '../components/Hero'
import { StatsBar } from '../components/StatsBar'
import { Philosophy } from '../components/Philosophy'
import { Projects } from '../components/Projects'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { StickyCTA } from '../components/StickyCTA'

export const HomePage = () => (
  <>
    <NavBar />
    <Hero />
    <StatsBar />
    <Philosophy />
    <Projects />
    <About />
    <Contact />
    <Footer />
    <StickyCTA />
  </>
)