import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Mouse parallax with memoized spring config
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = useMemo(() => ({ damping: 25, stiffness: 150 }), []);
  const videoX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);
  const videoY = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  // Memoized mouse move handler
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  }, [mouseX, mouseY]);

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), []);

  // Static data
  const highlightText = "Maximum";
  
  const features = useMemo(() => [
    { icon: 'savings', text: 'Lower Energy Bills', animation: 'bounce' },
    { icon: 'support_agent', text: '24/7 Support', animation: 'pulse' },
    { icon: 'hub', text: 'Unified Connectivity', animation: 'rotate' }
  ], []);

  const trustLogos = useMemo(() => [
    'Official One.nz Partner',
    'Trusted by 500+ businesses',
    '5% Admin Fee Only'
  ], []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background with Parallax */}
      <motion.div
        className="hero-video-wrapper"
        style={{
          x: videoX,
          y: videoY,
          scale: 1.1
        }}
      >
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
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        >
          <source src="/assets/Hero3.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Premium Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Subtle vignette */}
      <div className="hero-vignette" />

      {/* Content - Left Side */}
      <motion.div
        className="hero-content"
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-text-container">
          {/* Main Title - Simplified animation for better performance */}
          <motion.div variants={itemVariants}>
            <h1 className="hero-title">
              <span className="hero-title-line">One Connection.</span>
              <span className="hero-title-line">Zero Hassle.</span>
              <span className="hero-title-line">
                <span className="hero-title-highlight">{highlightText}</span> Savings.
              </span>
            </h1>
          </motion.div>

          {/* Feature Pills with Micro Animations */}
          <motion.div className="hero-features" variants={itemVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`hero-feature hero-feature-${feature.animation}`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className={`material-symbols-outlined hero-icon hero-icon-${feature.animation}`}
                  animate={
                    feature.animation === 'bounce'
                      ? { y: [0, -3, 0] }
                      : feature.animation === 'pulse'
                      ? { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }
                      : { rotate: [0, 10, -10, 0] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: feature.animation === 'rotate' ? 2 : 1.5,
                    ease: "easeInOut"
                  }}
                >
                  {feature.icon}
                </motion.span>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/contact">
              <motion.button
                className="hero-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Discover Solutions</span>
              </motion.button>
            </Link>
            <Link to="/blog">
              <motion.button
                className="hero-btn-link"
                whileHover="hover"
              >
                <span>Watch Process</span>
                <motion.span
                  className="material-symbols-outlined"
                  variants={{
                    hover: { x: 5, transition: { duration: 0.2 } }
                  }}
                >
                  arrow_forward
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            className="hero-trust-strip"
            variants={itemVariants}
          >
            {trustLogos.map((text, index) => (
              <div key={index} className="trust-item">
                <span className="material-symbols-outlined">verified</span>
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
