import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

interface LayoutProps {
  children: React.ReactNode
  // showPreloader?: boolean // No longer used - handled by React Preloader component
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* Custom cursor elements (from original theme) */}
      <div className="custom-cursor__cursor"></div>
      <div className="custom-cursor__cursor-two"></div>

      {/* Preloader now handled by React Preloader component in HomePage */}
      {/* {showPreloader && (
        <div className="preloader">
          <div className="preloader__image"></div>
        </div>
      )} */}

      {/* Main page wrapper */}
      <div id="page" className="site page-wrapper">
        <a className="skip-link screen-reader-text" href="#primary">
          Skip to content
        </a>

        <Header />
        
        <main id="primary" className="site-main">
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Layout
