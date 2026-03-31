import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';

const PowerBillSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const isInView = useInView(videoContainerRef, { once: true, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect for video
  const videoY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);

  // Play video once when in view
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [isInView]);

  return (
    <section className="power-bill-section" ref={sectionRef}>
      <div className="container">
        <div className="power-bill-grid">
          {/* Left: Content */}
          <AnimatedSection direction="left">
            <div className="power-bill-content">
              <span className="section-label">Savings Made Easy</span>
              <h2 className="power-bill-title">
                Saving Money Doesn't <span>Have to be Hard Work</span>
              </h2>
              <div className="power-bill-features">
                <div className="power-bill-feature">
                  <span className="material-symbols-outlined">upload_file</span>
                  <span>Upload Your Bill</span>
                </div>
                <div className="power-bill-feature">
                  <span className="material-symbols-outlined">analytics</span>
                  <span>We Analyze & Compare</span>
                </div>
                <div className="power-bill-feature">
                  <span className="material-symbols-outlined">savings</span>
                  <span>You Save Money</span>
                </div>
              </div>
              <a href="/contact" className="power-bill-btn">
                Upload Your Bill Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Discount Video */}
          <div className="power-bill-video-container" ref={videoContainerRef}>
            <motion.div
              className="power-bill-video-parallax"
              style={{ y: videoY }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94], // ease-out
                y: {
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                  bounce: 0.4
                }
              }}
            >
              <video
                ref={videoRef}
                className="power-bill-discount-video"
                src="/assets/discount.webm"
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerBillSection;
