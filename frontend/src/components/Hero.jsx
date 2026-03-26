import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const features = [
    { icon: 'check_circle', text: 'Lower energy bill' },
    { icon: 'eco', text: 'Green Energy' },
    { icon: 'support_agent', text: '24/7 support' }
  ];

  return (
    <section ref={sectionRef} className="hero-section">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        style={{
          opacity: videoLoaded ? 0.7 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src="/assets/Hero.webm" type="video/webm" />
      </video>

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <motion.div
        className="hero-content"
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{ maxWidth: '800px' }}>
          <motion.h1 className="hero-title" variants={itemVariants}>
            Powering a <br />
            <span>Brighter</span> Future
          </motion.h1>

          <motion.div className="hero-features" variants={itemVariants}>
            {features.map((feature, index) => (
              <div key={index} className="hero-feature">
                <span className="material-symbols-outlined">{feature.icon}</span>
                <span style={{ fontStyle: 'italic' }}>{feature.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <a href="#solutions" className="btn btn-primary btn-large">
              Discover Solutions
            </a>
            <a href="#process" className="btn-link">
              Watch Process
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ color: 'var(--primary)', textAlign: 'center' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>
            keyboard_arrow_down
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
