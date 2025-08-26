import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  rootMargin?: string;
  idleDelay?: number;
};

export default function Defer({ children, rootMargin = '200px', idleDelay = 1500 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    let idleTimer: number | undefined;
    const onIdle = () => setShow(true);

    // Idle fallback
    const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, opts?: any) => number);
    if (ric) idleTimer = ric(onIdle, { timeout: idleDelay });
    else idleTimer = window.setTimeout(onIdle, idleDelay);

    // In-viewport trigger
    const el = ref.current;
    if ('IntersectionObserver' in window && el) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      }, { rootMargin });
      io.observe(el);
      return () => { io.disconnect(); if (idleTimer) clearTimeout(idleTimer); };
    }
    return () => { if (idleTimer) clearTimeout(idleTimer); };
  }, [show, rootMargin, idleDelay]);

  return <div ref={ref}>{show ? children : null}</div>;
}
