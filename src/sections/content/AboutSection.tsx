import React, { useState, useEffect, useRef } from 'react';
import { AnimatedReveal } from '../../utils/animations';

const AboutSection: React.FC = () => {
  // Animated project counter (0 -> 79 on first scroll into view)
  const [projectCount, setProjectCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const countRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;
    const target = 99;
    const duration = 1400; // ms

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          setAnimating(true);
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const val = Math.round(eased * target);
            setProjectCount(val);
            if (progress < 1) requestAnimationFrame(tick); else setTimeout(() => setAnimating(false), 120);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <>
      {/* About Section */}
      <section className="about-one">
        <div className="about-one-shape-2 float-bob-x"></div>
        <div className="about-one-wall">
          <img src="/vendor/assets/uploads/2022/04/about-one-wall.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="about-one__left">
                <AnimatedReveal delay={100} animationType="fadeUp">
                  <div className="section-title text-left">
                    <span className="section-title__tagline">À PROPOS DE L'ENTREPRISE</span>
                    <h2 className="section-title__title">Nous Fournissons des Designs Muraux de Qualité</h2>
                    <div className="section-title__line"></div>
                  </div>
                </AnimatedReveal>
                
                <AnimatedReveal delay={200} animationType="fadeUp">
                  <p className="about-one__text-1">Nous avons plus de 5 ans d'expérience pour vous offrir des résultats de meilleure qualité.</p>
                </AnimatedReveal>
                
                <AnimatedReveal delay={300} animationType="fadeUp">
                  <ul className="list-unstyled about-one__points ml-0">
                    <li>
                      <div className="about-one__points-content-box">
                        <div className="about-one__points-icon icon-svg">
                          <span aria-hidden="true" className="icon-wallpaper"></span>
                        </div>
                        <div className="about-one__points-text-box">
                          <p className="about-one__points-text">Travaux Muraux Intelligents & Uniques</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="about-one__points-content-box">
                        <div className="about-one__points-icon icon-svg">
                          <span aria-hidden="true" className="icon-high-quality"></span>
                        </div>
                        <div className="about-one__points-text-box">
                          <p className="about-one__points-text">Les Meilleurs Standards de Qualité</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </AnimatedReveal>
                
                <AnimatedReveal delay={400} animationType="fadeUp">
                  <p className="about-one__text-2">Chez Magic Decor, nous transformons vos espaces avec passion et expertise. Notre équipe de professionnels qualifiés met tout en œuvre pour créer des intérieurs exceptionnels qui reflètent votre personnalité et vos goûts uniques.</p>
                </AnimatedReveal>
                
                <AnimatedReveal delay={500} animationType="fadeUp">
                  <div className="about-one__contact-us">
                    <div className="about-one__btn-box">
                      <a href="#about" className="thm-btn about-one__btn">En Savoir Plus</a>
                    </div>
                    <div className="about-one__call">
                      <div className="about-one__call-icon icon-svg">
                        <span aria-hidden="true" className="icon-phone-call"></span>
                      </div>
                      <div className="about-one__call-text">
                        <p>Appelez à tout moment</p>
                        <a href="tel:+21627911495">+216 27 911 495</a>
                      </div>
                    </div>
                  </div>
                </AnimatedReveal>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-one__right">
                <AnimatedReveal delay={100} animationType="fadeRight">
                  <div className="about-one__img-box">
                    <div className="about-one__img">
                      <img src="/vendor/assets/uploads/2022/04/about-one-img-1.jpg" alt="" />
                    </div>
                    <div className="about-one__small-img">
                      <img src="/vendor/assets/uploads/2022/04/about-one-small-img.jpg" alt="" />
                    </div>
                    <div className="about-one__project">
                      <div className="about-one__project-icon icon-svg-large">
                        <span aria-hidden="true" className="icon-wallpaper-1"></span>
                      </div>
                      <div className="about-one__project-content">
                        <h3
                          ref={countRef}
                          className="about-one__project-count"
                          aria-label={`Projets réalisés: ${projectCount}`}
                          style={{
                            filter: animating ? 'blur(1.2px)' : 'none',
                            transition: 'filter 320ms ease',
                            willChange: 'filter'
                          }}
                        > + {projectCount}</h3>
                        <p className="about-one__project-text">Projets Réussis</p>
                      </div>
                    </div>
                    <div className="about-one__shape-1 float-bob-y"></div>
                    <div className="about-one__dot">
                      <img src="/vendor/assets/uploads/2022/04/about-one-dots.png" alt="" />
                    </div>
                  </div>
                </AnimatedReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
