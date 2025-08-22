import React from 'react';
import { AnimatedReveal } from '../../utils/animations';

const BlogSection: React.FC = () => {
  return (
    <>
      {/* Blog Section */}
      <section className="blog-one" id="blog">
        <div className="container">
          <AnimatedReveal animationType="fadeUp" delay={100}>
            <div className="section-title text-center">
              <span className="section-title__tagline">ACTUALITÉS & MISES À JOUR</span>
              <h2 className="section-title__title">Actualités & Articles</h2>
              <div className="section-title__line"></div>
            </div>
          </AnimatedReveal>
          
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <AnimatedReveal animationType="fadeUp" delay={200}>
                <div className="blog-one__single">
                <div className="blog-one__img">
                  <img src="/vendor/assets/uploads/2022/04/blog-1-1-370x270.jpg" alt="" />
                  <a href="#">
                    <span className="blog-one__plus"></span>
                  </a>
                </div>
                <div className="blog-one__content">
                  <div className="blog-one__date">
                    <p>19 Apr, 2022</p>
                  </div>
                  <ul className="list-unstyled blog-one__meta ml-0">
                    <li><i className="far fa-user-circle"></i> Admin</li>
                    <li><span>/</span></li>
                    <li><i className="far fa-comments"></i> 2 Commentaires</li>
                  </ul>
                  <h3 className="blog-one__title"><a href="#">Apprenez la Bonne Façon d'Utiliser les Revêtements Muraux</a></h3>
                </div>
              </div>
              </AnimatedReveal>
            </div>
            <div className="col-xl-4 col-lg-4">
              <AnimatedReveal animationType="fadeUp" delay={300}>
                <div className="blog-one__single">
                  <div className="blog-one__img">
                    <img src="/vendor/assets/uploads/2022/04/blog-1-2-370x270.jpg" alt="" />
                    <a href="#">
                      <span className="blog-one__plus"></span>
                    </a>
                  </div>
                  <div className="blog-one__content">
                    <div className="blog-one__date">
                      <p>20 Apr, 2022</p>
                    </div>
                    <ul className="list-unstyled blog-one__meta ml-0">
                      <li><i className="far fa-user-circle"></i> Admin</li>
                      <li><span>/</span></li>
                      <li><i className="far fa-comments"></i> 2 Commentaires</li>
                    </ul>
                    <h3 className="blog-one__title"><a href="#">Solutions Rapides pour Problèmes Quotidiens</a></h3>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
            <div className="col-xl-4 col-lg-4">
              <AnimatedReveal animationType="fadeUp" delay={400}>
                <div className="blog-one__single">
                  <div className="blog-one__img">
                    <img src="/vendor/assets/uploads/2022/04/blog-1-3-370x270.jpg" alt="" />
                    <a href="#">
                      <span className="blog-one__plus"></span>
                    </a>
                  </div>
                  <div className="blog-one__content">
                    <div className="blog-one__date">
                      <p>20 Apr, 2022</p>
                    </div>
                    <ul className="list-unstyled blog-one__meta ml-0">
                      <li><i className="far fa-user-circle"></i> Admin</li>
                      <li><span>/</span></li>
                      <li><i className="far fa-comments"></i> 2 Commentaires</li>
                    </ul>
                    <h3 className="blog-one__title"><a href="#">Profitez des Opportunités Faciles</a></h3>
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

export default BlogSection;
