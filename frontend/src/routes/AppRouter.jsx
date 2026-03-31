import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { ScrollToTop } from '../components';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const LOAPage = lazy(() => import('../pages/LOAPage'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const BlogPost1 = lazy(() => import('../pages/BlogPost1'));
const BlogPost2 = lazy(() => import('../pages/BlogPost2'));
const BlogPost3 = lazy(() => import('../pages/BlogPost3'));

// Loading fallback component
const PageLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'var(--gray)'
  }}>
    <div style={{ 
      width: '40px', 
      height: '40px', 
      border: '3px solid rgba(255, 228, 19, 0.2)',
      borderTop: '3px solid var(--primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

const AppRouter = () => {
  return (
    <MainLayout>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/loa" element={<LOAPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/market-volatility" element={<BlogPost1 />} />
          <Route path="/blog/connectivity-guide" element={<BlogPost2 />} />
          <Route path="/blog/sustainability" element={<BlogPost3 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default AppRouter;
