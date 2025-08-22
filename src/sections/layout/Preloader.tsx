import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep preloader visible for 3 seconds to showcase the Magic Decor logo
    const delay = 1000; // ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="magic-preloader" role="status" aria-label="Loading">
      <div className="magic-preloader__image">
        {/* Use the full Magic Decor logo so the correct branding appears */}
        <img src="/assets/logos/logo-full.png" alt="Magic Decor" width={144} height={52} />
      </div>
    </div>
  );
};

export default Preloader;
