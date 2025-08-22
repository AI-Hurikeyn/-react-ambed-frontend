import React from 'react';
import { AnimatedReveal } from '../../utils/animations';

const ServicesSection: React.FC = () => {
  return (
    <>
      {/* Services Section */}
      <section className="services-one" id="services">
        <div className="services-one-bg-box">
          <div className="services-one-bg jarallax" data-jarallax data-speed="0.2" data-imgposition="50% 0%" style={{backgroundImage: 'url(/vendor/assets/uploads/2022/04/services-one-bg.jpg)'}}></div>
        </div>
        <div className="container">
          <AnimatedReveal delay={100} animationType="fadeUp">
            <div className="section-title text-center">
              <span className="section-title__tagline">NOS SERVICES</span>
              <h2 className="section-title__title">Services Que Nous Offrons</h2>
              <div className="section-title__line"></div>
            </div>
          </AnimatedReveal>
          
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <AnimatedReveal animationType="fadeUp" delay={200}>
                <div className="services-one__single">
                  <div className="services-one__img">
                    <img src="/vendor/assets/uploads/2022/04/services-2-1.jpg" alt="" />
                    <div className="services-one__icon icon-svg-large">
                      <span aria-hidden="true" className="icon-wallpaper-3"></span>
                    </div>
                  </div>
                  <div className="services-one__content">
                    <h3 className="services-one__title">
                      <a href="#services">Papiers Peints</a>
                    </h3>
                    <p className="services-one__text">Découvrez notre collection exclusive de papiers peints haut de gamme.</p>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
            
            <div className="col-xl-4 col-lg-4">
              <AnimatedReveal animationType="fadeUp" delay={300}>
                <div className="services-one__single">
                  <div className="services-one__img">
                    <img src="/vendor/assets/uploads/2022/04/services-2-2.jpg" alt="" />
                    <div className="services-one__icon icon-svg-large">
                      <span aria-hidden="true" className="icon-paint"></span>
                    </div>
                  </div>
                  <div className="services-one__content">
                    <h3 className="services-one__title">
                      <a href="#services">Peintures Murales</a>
                    </h3>
                    <p className="services-one__text">Transformez vos murs avec nos techniques de peinture artistique.</p>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
            
            <div className="col-xl-4 col-lg-4">
              <AnimatedReveal animationType="fadeUp" delay={400}>
                <div className="services-one__single">
                  <div className="services-one__img">
                    <img src="/vendor/assets/uploads/2022/04/services-2-3.jpg" alt="" />
                    <div className="services-one__icon icon-svg-large">
                      <span aria-hidden="true" className="icon-wallpaper-4"></span>
                    </div>
                  </div>
                  <div className="services-one__content">
                    <h3 className="services-one__title">
                      <a href="#services">Revêtements Muraux</a>
                    </h3>
                    <p className="services-one__text">Solutions innovantes de revêtements pour tous types d'espaces.</p>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
