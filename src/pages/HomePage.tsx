import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import * as WOW from 'wowjs';
import type { Swiper as SwiperClass } from 'swiper';

// Import decomposed sections
import {
  // Layout components
  CustomCursor,
  Preloader,
  MobileNavigation,
  SearchPopup,
  Footer,
  Header,
  // Content sections
  HeroSection,
  AboutSection,
  FeatureSection,
  ServicesSection,
  QualityWorkSection,
  ProjectsSection,
  TeamSection,
  TestimonialsSection,
  BrandSection,
  BlogSection,
} from '../sections';

import PricingPage from '../components/PricingPage';

const HomePage = () => {
  // Hero slider state
  const [projectThumbs, setProjectThumbs] = useState<SwiperClass | null>(null);
  // Pricing page state
  const [showPricing, setShowPricing] = useState(false);
  // Navbar scroll state
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle URL hash on initial load: support #pricing and store section hashes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#pricing') {
      setShowPricing(true);
    } else if (hash && /^#(home|about|services|portfolio|team|contact)$/.test(hash)) {
      // Prevent native jump, we will smooth-scroll after mount
      (window as any).__pendingHash = hash;
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else if (hash) {
      // Unknown hash, clean it
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    new WOW.WOW({ live: false }).init();

    // Ensure page starts at top and prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Scroll handler for navbar behavior
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor__cursor') as HTMLElement;
    let isActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
      }
    };

    const handleMouseEnter = () => {
      if (cursor && !isActive) {
        cursor.classList.add('active');
        isActive = true;
      }
    };

    const handleMouseLeave = () => {
      if (cursor && isActive) {
        cursor.classList.remove('active');
        isActive = false;
      }
    };

    // Mobile navigation functionality
    const mobileNavToggler = document.querySelectorAll('.mobile-nav__toggler');
    const mobileNavWrapper = document.querySelector('.mobile-nav__wrapper');

    const toggleMobileNav = (e: Event) => {
      e.preventDefault();
      if (mobileNavWrapper) {
        mobileNavWrapper.classList.toggle('expanded');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .thm-btn, .main-slider__btn, .main-slider__arrow, .swiper-button-next, .swiper-button-prev');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Mobile nav toggle listeners
    mobileNavToggler.forEach(toggler => {
      toggler.addEventListener('click', toggleMobileNav);
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      mobileNavToggler.forEach(toggler => {
        toggler.removeEventListener('click', toggleMobileNav);
      });
    };
  }, []);

  // Sync showPricing with browser history (push #pricing when opening, remove when closing)
  useEffect(() => {
    if (showPricing) {
      if (window.location.hash !== '#pricing') {
        history.pushState({ pricing: true }, '', '#pricing');
      }
    } else {
      if (window.location.hash === '#pricing') {
        history.replaceState({}, '', window.location.pathname + window.location.search);
      }
    }
  }, [showPricing]);

  // Handle back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash;
      if (hash === '#pricing') {
        setShowPricing(true);
      } else {
        setShowPricing(false);
        if (hash && /^#(home|about|services|portfolio|team|contact)$/.test(hash)) {
          (window as any).__pendingHash = hash;
        }
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Deferred smooth scroll after closing pricing or navigating by hash
  useEffect(() => {
    if (!showPricing && (window as any).__pendingHash) {
      const hash = (window as any).__pendingHash as string;
      delete (window as any).__pendingHash;

      const timeoutMs = 5000;
      const start = performance.now();
      let lastScrollY = window.scrollY;

      const tryScroll = () => {
        const el = document.querySelector(hash) as HTMLElement | null;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            const rect = el.getBoundingClientRect();
            const nearTop = rect.top > -24 && rect.top < 24;
            const scrolled = Math.abs(window.scrollY - lastScrollY) > 2;
            lastScrollY = window.scrollY;
            if (!nearTop && !scrolled && performance.now() - start < timeoutMs) {
              requestAnimationFrame(tryScroll);
            }
          }, 80);
        } else if (performance.now() - start < timeoutMs) {
          requestAnimationFrame(tryScroll);
        }
      };

      // slight delay to allow layout/sections to mount
      setTimeout(() => requestAnimationFrame(tryScroll), 50);
    }
  }, [showPricing]);

  return (
    <>
      {/* Layout Components */}
      <CustomCursor />
      <Preloader />
      <SearchPopup />

      {/* Home is always mounted */}
      {/* Hero Section with Overlaid Header */}
      <div className="hero-container" id="home">
        <Header 
          isScrolled={isScrolled}
          setShowPricing={setShowPricing}
        />
        <HeroSection />
      </div>
      <MobileNavigation setShowPricing={setShowPricing} />
      
      <div id="page" className="site page-wrapper">
        <a className="skip-link screen-reader-text" href="#primary">Aller au contenu</a>
        
        {/* Content Sections */}
        <div id="about">
          <AboutSection />
        </div>
        <FeatureSection />
        <div id="services">
          <ServicesSection />
        </div>
        <QualityWorkSection />
        <div id="portfolio">
          <ProjectsSection 
            projectThumbs={projectThumbs}
            setProjectThumbs={setProjectThumbs}
          />
        </div>
        <div id="team">
          <TeamSection />
        </div>
        <TestimonialsSection />
        <BrandSection />
        <BlogSection />
      </div>
      
      {/* Contact Section - Footer */}
      <div id="contact">
        <Footer />
      </div>

      {/* Pricing overlay (mounts over home) */}
      {showPricing && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 9999, overflowY: 'auto' }}>
          <div id="page" className="site page-wrapper">
            <PricingPage onBack={() => setShowPricing(false)} setShowPricing={setShowPricing} />
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
