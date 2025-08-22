import React, { useEffect, useRef, useState } from 'react';

// Simple, fluid animation component that doesn't break layout
export const AnimatedReveal: React.FC<{ 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeDown' | 'zoomIn' | 'fadeIn';
}> = ({ children, delay = 0, className = '', style = {}, animationType = 'fadeUp' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`smooth-reveal ${animationType} ${isVisible ? 'visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
