import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { testimonialSlides } from '../data';
import { AnimatedReveal } from '../../utils/animations';

const TestimonialsSection: React.FC = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className="testimonial-one" id="testimonials">
        <div className="testimonial-one-bg-box">
          <div className="testimonial-one-bg jarallax" data-jarallax data-speed="0.2" data-imgposition="50% 0%" style={{backgroundImage: 'url(/vendor/assets/uploads/2022/04/testimonial-one-bg.jpg)'}}></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <AnimatedReveal animationType="fadeUp" delay={100}>
                <div className="testimonial-one__left">
                  <div className="section-title text-left">
                    <span className="section-title__tagline">TÉMOIGNAGES</span>
                    <h2 className="section-title__title">Que Disent Nos Clients ?</h2>
                    <div className="section-title__line"></div>
                  </div>
                  <p className="testimonial-one__text">Découvrez les avis de nos clients satisfaits qui font confiance à Magic Decor pour leurs projets de décoration intérieure.</p>
                </div>
              </AnimatedReveal>
            </div>
            <div className="col-xl-9">
              <AnimatedReveal animationType="fadeLeft" delay={200}>
                <div className="testimonial-one__right">
                <Swiper
                  modules={[Autoplay]}
                  slidesPerView={2.25}
                  spaceBetween={30}
                  autoplay={{ delay: 3000 }}
                  breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 0 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1200: { slidesPerView: 2.25, spaceBetween: 30 }
                  }}
                  className="testimonial-one__carousel"
                >
                  {testimonialSlides.map((testimonial, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="testimonial-one__single">
                        <div className="testimonial-one__quote">
                          <span className="icon-quotation"></span>
                        </div>
                        <p className="testimonial-one__text-2">{testimonial.text}</p>
                        <div className="testimonial-one__client-info">
                          <div className="testimonial-one__img">
                            <img src={testimonial.img} alt={testimonial.name} />
                          </div>
                          <div className="testimonial-one__client-content">
                            <h4 className="testimonial-one__client-name">{testimonial.name}</h4>
                            <p className="testimonial-one__client-title">{testimonial.title}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                </div>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
