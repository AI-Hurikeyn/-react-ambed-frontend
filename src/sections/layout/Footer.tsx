import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer Section */}
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="footer-widget__column footer-widget__about">
                <div className="footer-widget__logo">
                  <a href="/">
                    <img className="dark-logo" src="/assets/logos/logo-symbol.png" alt="Magic Decor" />
                  </a>
                </div>
                <div className="footer-widget__about-text-box">
                  <p className="footer-widget__about-text">Nous travaillons avec passion pour relever les défis et créer des designs d'intérieur magiques qui transforment les espaces.</p>
                </div>
                <div className="site-footer__social">
                  <a className="icon-svg" href="https://www.facebook.com/share/1B2yWyLEbu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a className="icon-svg" href="https://www.tiktok.com/@_magic_decor_?_t=ZM-8yex9XrFOkA&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a className="icon-svg" href="https://www.instagram.com/magicdecor_officiel?igsh=aGl5bDU1OTE2d3Vk" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="footer-widget__column footer-widget__explore clearfix">
                <h3 className="footer-widget__title">Explorer</h3>
                <ul className="footer-widget__explore-list list-unstyled clearfix ml-0">
                  <li><a href="#about">À Propos</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#team">Notre Équipe</a></li>
                  <li><a href="#services">Nos Services</a></li>
                  <li><a href="#projects">Derniers Projets</a></li>
                  <li><a href="#pricing">Tarifs & Plans</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="footer-widget__column footer-widget__explore clearfix">
                <h3 className="footer-widget__title">Services</h3>
                <ul className="footer-widget__explore-list list-unstyled clearfix ml-0">
                  <li><a href="#services">Papiers Peints</a></li>
                  <li><a href="#services">Peinture Murale</a></li>
                  <li><a href="#services">Revêtements Muraux</a></li>
                  <li><a href="#services">Design Extérieur</a></li>
                  <li><a href="#services">Panneaux PVC</a></li>
                  <li><a href="#services">Design d'Intérieur</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="footer-widget__column footer-widget__contact clearfix">
                <h3 className="footer-widget__title">Contact</h3>
                <ul className="footer-widget__contact-list list-unstyled clearfix ml-0">
                  <li>
                    <div className="icon icon-svg"><span aria-hidden="true" className="icon-phone-call"></span></div>
                    <div className="text"><h5>Appelez à tout moment</h5><p><a href="tel:+21627911495">+216 27 911 495</a></p></div>
                  </li>
                  <li>
                    <div className="icon icon-svg"><span aria-hidden="true" className="icon-message"></span></div>
                    <div className="text"><h5>Envoyez un email</h5><p><a href="mailto:magicdecorofficiel@gmail.com">magicdecorofficiel@gmail.com</a></p></div>
                  </li>
                  <li>
                    <div className="icon icon-svg"><span aria-hidden="true" className="icon-location"></span></div>
                    <div className="text"><h5>Visitez-nous</h5><p>Nabeul , Tunisie</p></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="site-footer__bottom-inner">
                  <p className="site-footer__bottom-text">&copy; Droits d'auteur 2025 par Magic Decor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
