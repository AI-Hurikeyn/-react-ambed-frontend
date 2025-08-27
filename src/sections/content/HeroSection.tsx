import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { sliderData } from '../data';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Main Content: Hero Slider - Exact match to original demo */}
      <section className="main-slider clearfix hero-dynamic" id="home">
        <div className="swiper-container thm-swiper__slider">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: '#main-slider__swiper-button-next',
              prevEl: '#main-slider__swiper-button-prev'
            }}
            className="swiper-wrapper"
          >
            {sliderData.map((slide, idx) => (
              <SwiperSlide key={idx} className="swiper-slide">
                <div className="image-layer" style={{backgroundImage: `url(${slide.bg})`}}></div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="main-slider__content">
                        <div className="main-slider__icon">
                          <img src="/assets/logos/logo-symbol.png" alt="" />
                        </div>
                        <div className="main-slider__sub-title-box">
                          <p className="main-slider__sub-title">{slide.subheadline}</p>
                          <div className="main-slider__border-left"></div>
                          <div className="main-slider__border-right"></div>
                        </div>
                        <h2 
                          className="main-slider__title"
                          dangerouslySetInnerHTML={{
                            __html: slide.headline,
                          }}
                        />
                        <div className="main-slider__btn-box">
                          <a href="#about" className="thm-btn main-slider__btn">{slide.btn}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation arrows - styled grey as requested */}
          <div className="main-slider__nav">
            <div className="swiper-button-prev" id="main-slider__swiper-button-prev">
              <i className="fa fa-angle-left"></i>
            </div>
            <div className="swiper-button-next" id="main-slider__swiper-button-next">
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

// Replace previous injected styles with stronger, fluid responsive rules for hero text
if (typeof document !== 'undefined') {
  const prev = document.getElementById('hero-dynamic-styles');
  if (prev) prev.remove();
  const style = document.createElement('style');
  style.id = 'hero-dynamic-styles';
  style.textContent = `
  /* Scope only to the hero */
  .hero-dynamic .container { max-width: min(1120px, 92vw); padding-inline: clamp(12px, 3vw, 28px); }
  .hero-dynamic .main-slider__content { text-align: center; margin-inline: auto; }

  /* Subtitle */
  .hero-dynamic .main-slider__sub-title { 
    font-size: clamp(12px, 1.6vw, 16px);
    letter-spacing: .14em;
    text-transform: uppercase;
  }
  .hero-dynamic .main-slider__sub-title-box { margin-bottom: clamp(10px, 2.2vw, 20px); }

  /* Title scales with viewport; limit line length for better balance */
  .hero-dynamic .main-slider__title { 
    font-size: clamp(28px, 7.2vw, 74px);
    line-height: 1.08;
    letter-spacing: -0.012em;
    text-wrap: balance;
    word-break: break-word;
    max-width: 22ch;
    margin: 0 auto;
  }

  /* Button */
  .hero-dynamic .main-slider__btn-box { margin-top: clamp(14px, 3vw, 30px); }
  .hero-dynamic .main-slider__btn { 
    font-size: clamp(13px, 1.6vw, 17px);
    padding: clamp(10px, 1.6vw, 14px) clamp(16px, 2.6vw, 26px);
    border-radius: 12px;
    min-height: 44px;
  }

  /* Large tablets */
  @media (max-width: 1024px) {
    .hero-dynamic .main-slider__title { max-width: 22ch; }
  }

  /* Large phones / small tablets */
  @media (max-width: 820px) {
    .hero-dynamic .main-slider__title { font-size: clamp(26px, 7.4vw, 44px); max-width: 20ch; }
    .hero-dynamic .main-slider__title br { display: none; }
  }

  /* Small phones */
  @media (max-width: 600px) {
    .hero-dynamic .main-slider__title { font-size: clamp(22px, 8vw, 36px); max-width: 19ch; }
  }

  /* Very small devices */
  @media (max-width: 380px) {
    .hero-dynamic .main-slider__title { font-size: clamp(20px, 9vw, 30px); max-width: 18ch; }
    .hero-dynamic .main-slider__sub-title { font-size: clamp(11px, 3.2vw, 13px); }
  }

  /* Reduced motion respect for fade slider */
  @media (prefers-reduced-motion: reduce) {
    .hero-dynamic .swiper-slide { transition: none !important; }
  }
  `;
  document.head.appendChild(style);
}
