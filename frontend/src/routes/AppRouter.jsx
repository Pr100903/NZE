import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { AboutPage, ContactPage, HomePage, ServicesPage, PrivacyPolicy, FAQPage, BlogPage, LOAPage, BlogPost1, BlogPost2, BlogPost3 } from '../pages';
import { ScrollToTop } from '../components';

const AppRouter = () => {
  return (
    <MainLayout>
      <ScrollToTop />
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
    </MainLayout>
  );
};

export default AppRouter;
