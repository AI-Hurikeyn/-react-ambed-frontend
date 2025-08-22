import React from 'react';
import { AnimatedReveal } from '../../utils/animations';

const FeatureSection: React.FC = () => {
  return (
    <>
      {/* Feature Section */}
      <section className="feature-one">
        <div className="container">
          <ul className="list-unstyled feature-one__list">
            <li className="feature-one__single">
              <AnimatedReveal animationType="fadeUp" delay={100}>
                <div className="feature-one__content">
                  <div className="feature-one__shape-1">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-1.png" alt="" />
                  </div>
                  <div className="feature-one__shape-2">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-2.png" alt="" />
                  </div>
                  <div className="feature-one__icon icon-svg-large">
                    <span aria-hidden="true" className="icon-mind"></span>
                  </div>
                  <h3 className="feature-one__title">
                    <a href="#services">Travail Intelligent</a>
                  </h3>
                  <p className="feature-one__text">Nous utilisons des techniques avancées et des méthodes innovantes pour optimiser chaque projet.</p>
                  <div className="feature-one__arrow">
                    <a href="#services"><i className="fa fa-arrow-right"></i></a>
                  </div>
                </div>
              </AnimatedReveal>
            </li>
            
            <li className="feature-one__single">
              <AnimatedReveal animationType="fadeUp" delay={200}>
                <div className="feature-one__content">
                  <div className="feature-one__shape-1">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-1.png" alt="" />
                  </div>
                  <div className="feature-one__shape-2">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-2.png" alt="" />
                  </div>
                  <div className="feature-one__icon icon-svg-large">
                    <span aria-hidden="true" className="icon-wallpaper-2"></span>
                  </div>
                  <h3 className="feature-one__title">
                    <a href="#projects">Designs Uniques</a>
                  </h3>
                  <p className="feature-one__text">Chaque création est personnalisée pour refléter votre style et vos besoins spécifiques.</p>
                  <div className="feature-one__arrow">
                    <a href="#projects"><i className="fa fa-arrow-right"></i></a>
                  </div>
                </div>
              </AnimatedReveal>
            </li>
            
            <li className="feature-one__single">
              <AnimatedReveal animationType="fadeUp" delay={300}>
                <div className="feature-one__content">
                  <div className="feature-one__shape-1">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-1.png" alt="" />
                  </div>
                  <div className="feature-one__shape-2">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-2.png" alt="" />
                  </div>
                  <div className="feature-one__icon icon-svg-large">
                    <span aria-hidden="true" className="icon-programmer"></span>
                  </div>
                  <h3 className="feature-one__title">
                    <a href="#team">Équipe Qualifiée</a>
                  </h3>
                  <p className="feature-one__text">Notre équipe d'experts expérimentés garantit des résultats exceptionnels à chaque projet.</p>
                  <div className="feature-one__arrow">
                    <a href="#team"><i className="fa fa-arrow-right"></i></a>
                  </div>
                </div>
              </AnimatedReveal>
            </li>
            
            <li className="feature-one__single">
              <AnimatedReveal animationType="fadeUp" delay={400}>
                <div className="feature-one__content">
                  <div className="feature-one__shape-1">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-1.png" alt="" />
                  </div>
                  <div className="feature-one__shape-2">
                    <img src="/vendor/assets/uploads/2022/04/feature-one-shape-2.png" alt="" />
                  </div>
                  <div className="feature-one__icon icon-svg-large">
                    <span aria-hidden="true" className="icon-best-price"></span>
                  </div>
                  <h3 className="feature-one__title">
                    <a href="/book-appointment">Meilleurs Prix</a>
                  </h3>
                  <p className="feature-one__text">Des tarifs compétitifs et transparents pour des services de qualité supérieure.</p>
                  <div className="feature-one__arrow">
                    <a href="/book-appointment"><i className="fa fa-arrow-right"></i></a>
                  </div>
                </div>
              </AnimatedReveal>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
