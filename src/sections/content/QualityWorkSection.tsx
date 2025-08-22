import React from 'react';
import { AnimatedReveal } from '../../utils/animations';

const QualityWorkSection: React.FC = () => {
  return (
    <>
      {/* Quality Work Section */}
      <section className="quality-work">
        <div className="quality-work-shape-1 float-bob-x">
          <img src="/vendor/assets/uploads/2022/04/quality-work-shape-1.png" alt="" />
        </div>
        <div className="quality-work-shape-2 float-bob-x">
          <img src="/vendor/assets/uploads/2022/04/quality-work-shape-2.png" alt="" />
        </div>
        <div className="quality-work-shape-3 float-bob-x">
          <img src="/vendor/assets/uploads/2022/04/quality-work-shape-3.png" alt="" />
        </div>
        <div className="quality-work-shape-4 float-bob-x">
          <img src="/vendor/assets/uploads/2022/04/quality-work-shape-4.png" alt="" />
        </div>
        <div className="quality-work-shape-5 float-bob-x">
          <img src="/vendor/assets/uploads/2022/04/quality-work-shape-5.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <AnimatedReveal animationType="fadeRight" delay={100}>
                <div className="quality-work__left">
                  <div className="quality-work__img-box">
                    <div className="quality-work__img">
                      <img src="/vendor/assets/uploads/2022/04/quality-work-img-1.png" alt="" />
                    </div>
                    <div className="quality-work__small-img">
                      <img src="/vendor/assets/uploads/2022/04/quality-work-small-img.jpg" alt="" />
                    </div>
                   
                  </div>
                </div>
              </AnimatedReveal>
            </div>
            <div className="col-xl-6">
              <div className="quality-work__right">
                <AnimatedReveal animationType="fadeUp" delay={100}>
                  <div className="section-title text-left">
                    <span className="section-title__tagline">DESIGN D'INTÉRIEUR</span>
                    <h2 className="section-title__title">Travail de Qualité Qui Répond à Vos Attentes</h2>
                    <div className="section-title__line"></div>
                  </div>
                </AnimatedReveal>
                
                <AnimatedReveal animationType="fadeUp" delay={200}>
                  <p className="quality-work__text-1">Nous offrons une gamme complète de services de décoration intérieure pour transformer vos espaces en véritables œuvres d'art.</p>
                </AnimatedReveal>
                
                <AnimatedReveal animationType="fadeUp" delay={300}>
                  <ul className="list-unstyled quality-work__feature ml-0">
                    <li>
                      <div className="icon icon-svg-large">
                        <span aria-hidden="true" className="icon-image-gallery1"></span>
                      </div>
                      <div className="text">
                        <p>Designs Innovants<br />de Papiers Peints</p>
                      </div>
                    </li>
                    <li>
                      <div className="icon icon-svg-large">
                        <span aria-hidden="true" className="icon-wallpaper-5"></span>
                      </div>
                      <div className="text">
                        <p>Matériaux Muraux<br />de Haute Qualité</p>
                      </div>
                    </li>
                  </ul>
                </AnimatedReveal>
                
                <AnimatedReveal animationType="fadeUp" delay={400}>
                  <p className="quality-work__text-2">Chez Magic Decor, nous nous engageons à fournir des services exceptionnels avec une attention méticuleuse aux détails. Notre expertise et notre passion garantissent des résultats qui dépassent vos attentes.</p>
                </AnimatedReveal>
                <div className="quality-work__progress">
                  <div className="quality-work__progress-single">
                    <h4 className="quality-work__progress-title">Design Mural Intérieur</h4>
                    <div className="bar">
                      <div className="bar-inner count-bar" data-percent="88%">
                        <div className="count-text">88%</div>
                      </div>
                    </div>
                  </div>
                  <div className="quality-work__progress-single">
                    <h4 className="quality-work__progress-title">Peinture Extérieure</h4>
                    <div className="bar">
                      <div className="bar-inner count-bar" data-percent="60%">
                        <div className="count-text">60%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QualityWorkSection;
