import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { projectSlides } from '../data';
import { AnimatedReveal } from '../../utils/animations';
import type { Swiper as SwiperClass } from 'swiper';

interface ProjectsSectionProps {
  projectThumbs: SwiperClass | null;
  setProjectThumbs: (swiper: SwiperClass | null) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectThumbs, setProjectThumbs }) => {
  return (
    <>
      {/* Projects Section */}
      <section className="project-one" id="projects">
        <div className="container">
          <AnimatedReveal animationType="fadeUp" delay={100}>
            <div className="section-title text-center">
              <span className="section-title__tagline">PROJETS RÉUSSIS</span>
              <h2 className="section-title__title">Gardez un Œil sur Nos<br />Inspiration</h2>
              <div className="section-title__line"></div>
            </div>
          </AnimatedReveal>
          
          <AnimatedReveal animationType="fadeUp" delay={200}>
            <div className="project-one__inner">
            <div className="project-one__main-content">
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: projectThumbs }}
                className="project-one__carousel"
              >
                {projectSlides.map((project, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6">
                        <div className="project-one__left">
                          <div className="project-one__img">
                            <img
                              src={project.img}
                              alt={project.title}
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (project.fallbackOriginal && target.getAttribute('data-fallback-applied') !== '1') {
                                  target.src = project.fallbackOriginal;
                                  target.setAttribute('data-fallback-applied', '1');
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="project-one__right">
                          <div className="project-one__content-box">
                            <div className="project-one-shape-1 float-bob-y">
                              <img src="/vendor/assets/uploads/2022/04/project-one-shape-1.png" alt="" />
                            </div>
                            <div className="project-one__content">
                              <h4 className="project-one__title">{project.title}</h4>
                              <p className="project-one__text">{project.text}</p>
                              <a href={project.link} className="thm-btn project-one__btn">En Savoir Plus</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="project-one__thumb-box">
              <Swiper
                modules={[Navigation]}
                navigation
                slidesPerView={4}
                spaceBetween={20}
                onSwiper={setProjectThumbs}
                className="project-one__thumb"
              >
                {projectSlides.map((project, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="project-one__img-holder">
                      <img src={project.thumb} alt={project.title} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="project-one__more-project">
                <div className="project-one__more-project-content">
                  <p>Nous sommes toujours prêts à vous servir. <a href="#projects">Voir plus de projets</a></p>
                </div>
              </div>
            </div>
          </div>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
