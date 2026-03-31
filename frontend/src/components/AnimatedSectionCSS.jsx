import { useRef, useEffect, useState } from 'react';

/**
 * CSS-based animated section - no framer-motion dependency
 * Uses Intersection Observer for scroll-triggered animations
 */
const AnimatedSectionCSS = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '-50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const directionStyles = {
    up: { '--translate-x': '0', '--translate-y': '40px' },
    down: { '--translate-x': '0', '--translate-y': '-40px' },
    left: { '--translate-x': '-40px', '--translate-y': '0' },
    right: { '--translate-x': '40px', '--translate-y': '0' },
    scale: { '--translate-x': '0', '--translate-y': '0', '--scale': '0.95' },
  };

  return (
    <div
      ref={ref}
      className={`animated-section ${isVisible ? 'visible' : ''} ${className}`}
      style={{
        ...directionStyles[direction],
        '--delay': `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSectionCSS;
