import { useState } from 'react'
import HeroSection from './components/HeroSection.jsx'
import KeyHighlights from './components/KeyHighlights.jsx'
import ClubhousesSection from './components/ClubhousesSection.jsx'
import BuildingShowcase from './components/BuildingShowcase.jsx'
import FloorPlansSection from './components/FloorPlansSection.jsx'
import LocationSection from './components/LocationSection.jsx'
import GallerySection from './components/GallerySection.jsx'
import AwardsSection from './components/AwardsSection.jsx'
import NavigationOverlay from './components/NavigationOverlay.jsx'
import TheTrilightSection from './components/TheTrilightSection.jsx'
import { galleryItems } from './data/gallery.js'
import SectionPlaceholder from './components/SectionPlaceholder.jsx'
import DownloadSection from './components/DownloadSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import ConstructionUpdatesSection from './components/ConstructionUpdatesSection.jsx'
import ResidencesSection from './components/ResidencesSection.jsx'
import LimitedEditionsSection from './components/LimitedEditionsSection.jsx'
import SpecificationsSection from './components/SpecificationsSection.jsx'
import PromotersSection from './components/PromotersSection.jsx'
import NewsletterSection from './components/NewsletterSection.jsx'
import BlogSection from './components/BlogSection.jsx'
import NewsSection from './components/NewsSection.jsx'
import CareersSection from './components/CareersSection.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const openNav = () => setNavOpen(true)
  const closeNav = () => setNavOpen(false)
  return (
    <>
      <NavigationOverlay open={navOpen} onClose={closeNav} />
      <HeroSection onOpenNav={openNav} />
      <TheTrilightSection />
      <KeyHighlights />
      <ClubhousesSection />
      <BuildingShowcase />
      <GallerySection items={galleryItems} />
      <FloorPlansSection />
      <AwardsSection />
      <LocationSection />
      <ResidencesSection />
      <LimitedEditionsSection />
      <SpecificationsSection />
      <PromotersSection />
      <NewsletterSection />
      <BlogSection />
      <ConstructionUpdatesSection />
      <TestimonialsSection />
      <DownloadSection />
      <NewsSection />
      
      <CareersSection />
      <Footer />
    </>
  )
}

export default App
