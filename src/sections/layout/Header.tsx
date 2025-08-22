import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface HeaderProps {
  isScrolled?: boolean;
  setShowPricing?: (show: boolean) => void;
  forceDefer?: boolean; // when true, always close pricing overlay on hash nav
}

const defaultNavItems = [
  { name: "Accueil", href: '#home' },
  { name: 'À Propos', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Nos Certifications', href: '#team' },
  { name: 'Obtenir Un Devis', href: '#pricing', action: 'pricing' },
  { name: 'Contact', href: '#contact' },
];

const Header = ({ isScrolled = false, setShowPricing, forceDefer = false }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setScrolled(latest > 50);
  });

  const currentScrollState = isScrolled || scrolled;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15, staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 12 } }
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Close panel if resizing to desktop
  useEffect(() => { if (!isMobile && isMobileMenuOpen) setIsMobileMenuOpen(false); }, [isMobile, isMobileMenuOpen]);

  // Always use the same nav items
  const navItems = defaultNavItems;

  const scrollToId = (id?: string) => {
    if (!id) return false;
    const el = document.querySelector(id);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  };

  // Fallback navigation; when forceDefer is true (Pricing overlay), always close overlay
  const navigateOrDefer = (href?: string) => {
    if (!href) return;
    if (href.startsWith('#')) {
      const ok = forceDefer ? false : scrollToId(href);
      if (!ok && setShowPricing) {
        // Remember hash and close pricing view; Home will scroll after
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__pendingHash = href;
        // Update hash to trigger hashchange listeners immediately
        if (window.location.hash !== href) window.location.hash = href; else window.dispatchEvent(new Event('hashchange'));
        setShowPricing(false);
      } else if (forceDefer && setShowPricing) {
        // Even if element exists, we still want to close the overlay and defer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__pendingHash = href;
        if (window.location.hash !== href) window.location.hash = href; else window.dispatchEvent(new Event('hashchange'));
        setShowPricing(false);
      }
    }
  };

  // --- Scroll spy & hash sync: keep active item in sync with visible section ---
  useEffect(() => {
    const sections = navItems
      .map((item, index) => ({ index, href: item.href }))
      .filter(v => v.href && v.href.startsWith('#') && v.href !== '#pricing') as Array<{ index: number; href: string }>;

    const indexByHref = new Map<string, number>();
    sections.forEach(s => indexByHref.set(s.href, s.index));

    const onHashChange = () => {
      const h = window.location.hash;
      if (h && indexByHref.has(h)) setActiveItem(indexByHref.get(h)!);
    };

    // Use IntersectionObserver to detect the most visible section
    let io: IntersectionObserver | null = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const visibility = new Map<number, number>();
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          const href = id ? `#${id}` : '';
          const idx = indexByHref.get(href);
          if (typeof idx === 'number') {
            visibility.set(idx, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
        });

        // pick the section with the highest visible ratio
        let bestIdx: number | null = null;
        let bestRatio = 0;
        visibility.forEach((ratio, idx) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestIdx = idx; }
        });

        if (bestIdx !== null) setActiveItem(bestIdx);
      }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-120px 0px -40% 0px' });

      sections.forEach(s => {
        const el = document.querySelector(s.href!);
        if (el) io!.observe(el);
      });
    } else {
      // Fallback: simple scroll-based determination
      let ticking = false;
      const onScroll = () => {
        if (ticking) return; ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          let currentIndex = sections[0]?.index ?? 0;
          const offset = 140;
          for (const s of sections) {
            const el = document.querySelector(s.href);
            if (!el) continue;
            const top = (el as HTMLElement).getBoundingClientRect().top;
            if (top - offset <= 0) currentIndex = s.index; else break;
          }
          setActiveItem(currentIndex);
        });
      };
      // use any-cast to satisfy TS in this environment
      (window as any).addEventListener('scroll', onScroll, { passive: true });
      // run once
      onScroll();

      return () => {
        (window as any).removeEventListener('scroll', onScroll as EventListener);
        (window as any).removeEventListener('hashchange', onHashChange);
      };
    }

    // initial sync
    onHashChange();
    // ensure a scroll recompute happens after mounting
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 30);

    window.addEventListener('hashchange', onHashChange);

    return () => {
      if (io) io.disconnect();
      window.removeEventListener('hashchange', onHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Floating Navbar Container */}
      <motion.nav
        ref={headerRef}
        className={`navbar ${currentScrollState ? 'navbar--scrolled' : ''} ${isMobile && isMobileMenuOpen ? 'is-open' : ''}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
      >
        {/* Navbar Content Wrapper */}
        <motion.div className="navbar__wrapper" variants={containerVariants} initial="hidden" animate="visible">
          {/* Left Navigation Links */}
          <motion.div className="navbar__left" variants={itemVariants}>
            {navItems.map((item, index) => (
              <motion.div key={item.name} variants={itemVariants}>
                <a
                  href={item.href || '#'}
                  className={`navbar__nav-link ${activeItem === index ? 'navbar__nav-link--active' : ''}`}
                  onClick={(e) => {
                    if (item.action === 'pricing') {
                      e.preventDefault();
                      setShowPricing?.(true);
                      setActiveItem(index);
                    } else if (item.href?.startsWith('#')) {
                      e.preventDefault();
                      navigateOrDefer(item.href);
                      // Optimistically set active to target
                      setActiveItem(index);
                    }
                  }}
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Brand Logo */}
          <motion.div className="navbar__right" variants={itemVariants}>
            <motion.a 
              href="/"
              className="navbar__brand"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                setShowPricing?.(false);
                // Reset active based on current scroll after closing
                setTimeout(() => { window.dispatchEvent(new Event('scroll')); }, 0);
              }}
            >
              <motion.img
                src="/assets/logos/logo-symbol.png"
                alt="Magic Decor"
                className="navbar__brand-logo"
                initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 15 }}
              />
              <motion.span 
                className="navbar__brand-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100, damping: 15 }}
              >
                Magic Decor
              </motion.span>
            </motion.a>

            {/* Mobile Menu Toggle - Only visible on mobile */}
            <motion.button 
              className={`navbar__mobile-toggle ${isMobileMenuOpen ? 'navbar__mobile-toggle--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(o => !o)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobileMenuPanel"
              type="button"
            >
              <span className="navbar__icon-bars"><span></span><span></span><span></span></span>
            </motion.button>
          </motion.div>
         </motion.div>

        {/* Mobile overlay & panel INSIDE nav so .navbar.is-open styles apply */}
        {isMobile && (
          <>
            <div className="navbar__overlay" onClick={() => setIsMobileMenuOpen(false)} aria-hidden={!isMobileMenuOpen} />
            <div id="mobileMenuPanel" className="navbar__panel" role="menu" aria-hidden={!isMobileMenuOpen}>
              <div className="navbar__panel-label">Navigation</div>
              <ul className="navbar__panel-nav">
                {navItems.map((item, index) => (
                  <li key={item.name}>
                    <a
                      href={item.href || '#'}
                      className={`navbar__panel-link ${activeItem === index ? 'navbar__panel-link--active' : ''}`}
                      onClick={(e) => {
                        if (item.action === 'pricing') { e.preventDefault(); setShowPricing?.(true); setActiveItem(index); }
                        else if (item.href?.startsWith('#')) { e.preventDefault(); navigateOrDefer(item.href); setActiveItem(index); }
                        setIsMobileMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </motion.nav>
    </>
  );
};

export default Header;