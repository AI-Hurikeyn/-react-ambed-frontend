import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { sliderData } from '../data';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Main Content: Hero Slider - Exact match to original demo */}
      <section className="main-slider clearfix" id="home">
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
                          <img src="/vendor/assets/uploads/2022/04/main-slider-icon.png" alt="" />
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
