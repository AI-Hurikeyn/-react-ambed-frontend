import React, { useState, useEffect } from 'react';
import { sliderData } from '../data';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const preloadImage = (src?: string) => new Promise<void>(resolve => {
  if (!src) return resolve();
  const img = new Image();
  const timeout = setTimeout(() => resolve(), 2000); // 2s timeout
  img.onload = () => { clearTimeout(timeout); resolve(); };
  img.onerror = () => { clearTimeout(timeout); resolve(); };
  img.src = src;
});

const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // add body flag to avoid scroll/layout glitches while loading
    document.body.classList.add('preloading');

    const MIN_VISIBLE = 300; // ms, shorter for refresh
    const MAX_WAIT = 2000;   // ms, much shorter timeout
    const start = performance.now();

    // More robust loading detection
    const fontsReady = (document as any).fonts?.ready?.catch(() => Promise.resolve()) ?? Promise.resolve();
    const heroReady = preloadImage(sliderData?.[0]?.bg).catch(() => Promise.resolve());

    const windowLoaded = new Promise<void>(resolve => {
      if (document.readyState === 'complete') return resolve();
      const timeout = setTimeout(() => resolve(), 1500); // timeout after 1.5s
      const onLoad = () => { 
        clearTimeout(timeout);
        window.removeEventListener('load', onLoad); 
        resolve(); 
      };
      window.addEventListener('load', onLoad);
    });

    const timeGuard = wait(MAX_WAIT);

    Promise.race([
      Promise.all([fontsReady, heroReady, windowLoaded]),
      timeGuard
    ]).then(async () => {
      const elapsed = performance.now() - start;
      if (elapsed < MIN_VISIBLE) await wait(MIN_VISIBLE - elapsed);
      // fade out then unmount
      setFading(true);
      await wait(300);
      setVisible(false);
      document.body.classList.remove('preloading');
    }).catch(() => {
      // Fallback in case of any errors
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        document.body.classList.remove('preloading');
      }, 300);
    });

    // Emergency fallback - always remove after 3s max
    const emergencyTimeout = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        document.body.classList.remove('preloading');
      }, 300);
    }, 3000);

    return () => {
      clearTimeout(emergencyTimeout);
      document.body.classList.remove('preloading');
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`magic-preloader${fading ? ' magic-preloader--fade' : ''}`} role="status" aria-label="Loading">
      <div className="magic-preloader__image">
        <img src="/assets/logos/logo-full.png" alt="Magic Decor" width={144} height={52} />
      </div>
    </div>
  );
};

export default Preloader;
