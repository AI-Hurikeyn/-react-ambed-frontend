import { BaseComponentProps } from '@/types'

interface HeaderProps extends BaseComponentProps {
  setShowPricing?: (show: boolean) => void;
}

const SOCIAL = {
  facebook: 'https://www.facebook.com/share/1B2yWyLEbu/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/magicdecor_officiel?igsh=aGl5bDU1OTE2d3Vk',
  tiktok: 'https://www.tiktok.com/@_magic_decor_?_t=ZM-8yex9XrFOkA&_r=1'
};

const Header = ({ className, setShowPricing }: HeaderProps) => {
  return (
    <header className={`main-header clearfix ${className || ''}`}>
      <div className="main-header__top">
        <div className="container">
          <div className="main-header__top-inner clearfix">
            <div className="main-header__logo">
              <a href="/">
                <img 
                  className="dark-logo" 
                  src="/assets/logos/logo-full-dark.png" 
                  alt="Magic Decor" 
                />
                <img 
                  className="light-logo" 
                  src="/assets/logos/logo-full.png" 
                  alt="Magic Decor" 
                />
              </a>
            </div>
            <div className="main-header__top-right">
              <div className="main-header__top-right-content">
                <div className="main-header__top-address-box">
                  <ul className="list-unstyled main-header__top-address ml-0">
                    <li>
                      <div className="icon icon-svg">
                        <span aria-hidden="true" className="icon-phone-call"></span>
                      </div>
                      <div className="content">
                        <p>Appelez à tout moment</p>
                        <h5><a href="tel:+2169021425">+ (216) 90 214 250</a></h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon icon-svg">
                        <span aria-hidden="true" className="icon-message"></span>
                      </div>
                      <div className="content">
                        <p>Envoyez un email</p>
                        <h5><a href="mailto:contact@magicDecor.com">contact@magicDecor.com</a></h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon icon-svg">
                        <span aria-hidden="true" className="icon-location"></span>
                      </div>
                      <div className="content">
                        <p>Localisation</p>
                        <h5>Tunis, Tunisie</h5>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="main-header__top-right-social">
                  <a className="icon-svg" href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i aria-hidden="true" className="fab fa-facebook"></i>
                  </a>
                  <a className="icon-svg" href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <i aria-hidden="true" className="fab fa-tiktok"></i>
                  </a>
                  <a className="icon-svg" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i aria-hidden="true" className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="main-menu clearfix">
        <div className="main-menu__wrapper clearfix">
          <div className="container">
            <div className="main-menu__wrapper-inner clearfix">
              <div className="main-menu__left">
                <ul className="main-menu__list">
                  <li className="scrollToLink menu-item">
                    <a href="#home">Accueil</a>
                  </li>
                  <li className="scrollToLink menu-item">
                    <a href="#about">À Propos</a>
                  </li>
                  <li className="scrollToLink menu-item">
                    <a href="#services">Services</a>
                  </li>
                  <li className="scrollToLink menu-item">
                    <a href="#portfolio">Portfolio</a>
                  </li>
                  <li className="scrollToLink menu-item">
                    <a href="#team">Équipe</a>
                  </li>
                  <li className="menu-item">
                    <a 
                      href="#pricing" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPricing?.(true);
                      }}
                    >
                      Tarifs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="main-menu__right">
                <div className="main-menu__search-btn-box">
                  <div className="main-menu__search-box">
                    <a href="#" className="main-menu__search search-toggler icon-magnifying-glass"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky header */}
      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content"></div>
      </div>

      {/* Mobile navigation */}
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler"></div>
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler"></span>
          <div className="logo-box">
            <a href="/">
              <img 
                width={144} 
                height={52} 
                src="/assets/logos/logo-full.png" 
                alt="Magic Decor" 
              />
            </a>
          </div>
          <div className="mobile-nav__container"></div>
          <ul className="mobile-nav__contact list-unstyled ml-0">
            <li>
              <i className="fa fa-envelope"></i>
              <a href="mailto:contact@magicDecor.com">contact@magicDecor.com</a>
            </li>
            <li>
              <i className="fa fa-phone-alt"></i>
              <a href="tel:+2169021425">+ (216) 90 214 250</a>
            </li>
          </ul>
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <a className="icon-svg" href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span aria-hidden="true" className="fab fa-facebook"></span>
              </a>
              <a className="icon-svg" href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <span aria-hidden="true" className="fab fa-tiktok"></span>
              </a>
              <a className="icon-svg" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span aria-hidden="true" className="fab fa-instagram"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search popup */}
      <div className="search-popup">
        <div className="search-popup__overlay search-toggler"></div>
        <div className="search-popup__content">
          <form>
            <label htmlFor="search" className="sr-only">rechercher ici</label>
            <input type="text" id="search" name="s" placeholder="Rechercher..." />
            <button type="submit" aria-label="search submit" className="thm-btn">
              <i className="icon-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header
