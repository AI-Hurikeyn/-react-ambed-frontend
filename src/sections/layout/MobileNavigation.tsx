import React from 'react';

interface MobileNavigationProps {
  setShowPricing: (value: boolean) => void;
}

const SOCIAL = {
  facebook: 'https://www.facebook.com/share/1B2yWyLEbu/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/magicdecor_officiel?igsh=aGl5bDU1OTE2d3Vk',
  tiktok: 'https://www.tiktok.com/@_magic_decor_?_t=ZM-8yex9XrFOkA&_r=1'
};

// Unified nav items (match Header)
const navItems = [
  { name: 'Accueil', href: '#home' },
  { name: 'À Propos', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Nos Certifications', href: '#team' },
  { name: 'Obtenir Un Devis', href: '#pricing', action: 'pricing' as const },
  { name: 'Contact', href: '#contact' }
];

type NavItem = typeof navItems[number];

const MobileNavigation: React.FC<MobileNavigationProps> = ({ setShowPricing }) => {
  const scrollToId = (hash?: string) => {
    if (!hash) return false;
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();

    if (item.action === 'pricing') {
      setShowPricing(true);
    } else if (item.href?.startsWith('#')) {
      // Attempt in-page scroll first (works when already on homepage)
      const didScroll = scrollToId(item.href);
      if (!didScroll) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__pendingHash = item.href;
        setShowPricing(false);
      }
    }

    // Close mobile nav panel
    const wrapper = document.querySelector('.mobile-nav__wrapper');
    wrapper?.classList.remove('expanded');
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler"></div>
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler"></span>
          <div className="logo-box">
            <a href="/">
              <img src="/assets/logos/logo-symbol.png" alt="Magic Decor" />
            </a>
          </div>
          <div className="mobile-nav__container">
            <div className="collapse navbar-collapse clearfix" id="navbarSupportedContent">
              <ul className="navigation clearfix">
                {navItems.map((item) => (
                  <li key={item.name} className="menu-item">
                    <a href={item.href || '#'} onClick={(e) => handleClick(e, item)}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="mobile-nav__contact list-unstyled ml-0">
            <li>
              <i className="fa fa-envelope"></i>
              <a href="mailto:MagicDecor@gmail.com">MagicDecor@gmail.com</a>
            </li>
            <li>
              <i className="fa fa-phone-alt"></i>
              <a href="tel:+21627911495">+216 27 911 495</a>
            </li>
          </ul>
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <a target="_blank" rel="noopener noreferrer" className="icon-svg" href={SOCIAL.facebook} aria-label="Facebook">
                <span aria-hidden="true" className="fab fa-facebook"></span>
              </a>
              <a target="_blank" rel="noopener noreferrer" className="icon-svg" href={SOCIAL.tiktok} aria-label="TikTok">
                <span aria-hidden="true" className="fab fa-tiktok"></span>
              </a>
              <a target="_blank" rel="noopener noreferrer" className="icon-svg" href={SOCIAL.instagram} aria-label="Instagram">
                <span aria-hidden="true" className="fab fa-instagram"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
