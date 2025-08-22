/**
 * MAGIC DECOR - Dynamic Scroll Animations
 * Professional scroll-triggered animations for enhanced user experience
 */

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.addAnimationClasses();
        this.setupIntersectionObserver();
        this.addSmoothScrolling();
    }

    addAnimationClasses() {
        // Add animation classes to elements
        const animations = [
            { selector: '.section-title', animation: 'fade-in-up' },
            { selector: '.feature-one__single', animation: 'fade-in-up', stagger: true },
            { selector: '.service-one__single', animation: 'fade-in-scale', stagger: true },
            { selector: '.project-one__single', animation: 'fade-in-up', stagger: true },
            { selector: '.team-one__single', animation: 'fade-in-scale', stagger: true },
            { selector: '.blog-one__single', animation: 'fade-in-up', stagger: true },
            { selector: '.about-one__content', animation: 'fade-in-left' },
            { selector: '.about-one__image', animation: 'fade-in-right' },
            { selector: '.quality-work__content', animation: 'fade-in-up' },
            { selector: '.testimonial-one__content', animation: 'fade-in-scale' },
            { selector: '.brand-one__single', animation: 'fade-in-up', stagger: true }
        ];

        animations.forEach(({ selector, animation, stagger }) => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach((element, index) => {
                element.classList.add('animate-on-scroll', animation);
                
                if (stagger && index < 5) {
                    element.classList.add(`delay-${index + 1}`);
                }
                
                this.animatedElements.push(element);
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add visible class to trigger animation
                    element.style.opacity = '1';
                    
                    // Get animation class
                    const animationClass = Array.from(element.classList)
                        .find(cls => cls.startsWith('fade-in'));
                    
                    if (animationClass) {
                        element.classList.add(animationClass);
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    addSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll reveal for sections
        this.addScrollReveal();
    }

    addScrollReveal() {
        const sections = document.querySelectorAll('section, .main-slider');
        
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                }
            });
        }, revealOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            revealObserver.observe(section);
        });

        // Add CSS for section reveal
        this.addSectionRevealCSS();
    }

    addSectionRevealCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .section-revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Parallax effect for hero section */
            .main-slider {
                transform-style: preserve-3d;
            }
            
            .main-slider__bg {
                transform: translateZ(-1px) scale(2);
            }
            
            /* Hover effects for interactive elements */
            .animate-on-scroll:hover {
                transform: translateY(-2px) !important;
                transition: transform 0.3s ease !important;
            }
            
            /* Progressive reveal for cards */
            .service-one__single,
            .feature-one__single,
            .project-one__single,
            .team-one__single,
            .blog-one__single {
                transform-origin: center bottom;
            }
            
            /* Magnetic effect for buttons */
            .thm-btn {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            
            .thm-btn:hover {
                transform: translateY(-3px) scale(1.02) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Public method to manually trigger animations
    triggerAnimation(element, animationType = 'fade-in-up') {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            element.classList.add('animate-on-scroll', animationType);
            element.style.opacity = '1';
            element.classList.add(animationType);
        }
    }

    // Refresh animations (useful for dynamic content)
    refresh() {
        this.animatedElements = [];
        this.setup();
    }
}

// Initialize scroll animations when page loads
const scrollAnimations = new ScrollAnimations();

// Make it globally accessible
window.ScrollAnimations = scrollAnimations;

// Add some extra interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add cursor follow effect for large screens
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(45, 45, 45, 0.1);
            border: 2px solid rgba(45, 45, 45, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale cursor on hover over interactive elements
        document.querySelectorAll('a, button, .thm-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(45, 45, 45, 0.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(45, 45, 45, 0.1)';
            });
        });
    }

    // Add loading animation completion
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        
        // Trigger hero animation after page load
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.main-slider h1, .main-slider h2, .main-slider p, .main-slider .thm-btn');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 300);
    });
});
