import React, { useState, useEffect } from 'react';
import { sliderData } from '../data';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const preloadImage = (src?: string) => new Promise<void>(resolve => {
  if (!src) return resolve();
  const img = new Image();
  img.onload = () => resolve();
  img.onerror = () => resolve();
  img.src = src;
});

const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // add body flag to avoid scroll/layout glitches while loading
    document.body.classList.add('preloading');

    const MIN_VISIBLE = 600; // ms, keep a short, consistent brand moment
    const MAX_WAIT = 3500;   // ms, never block too long
    const start = performance.now();

    const fontsReady = (document as any).fonts?.ready ?? Promise.resolve();
    const heroReady = preloadImage(sliderData?.[0]?.bg);

    const windowLoaded = new Promise<void>(resolve => {
      if (document.readyState === 'complete') return resolve();
      const onLoad = () => { window.removeEventListener('load', onLoad); resolve(); };
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
      await wait(350);
      setVisible(false);
      document.body.classList.remove('preloading');
    });

    return () => {
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
