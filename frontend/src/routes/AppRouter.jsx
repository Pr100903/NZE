import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { AboutPage, ContactPage, HomePage, ServicesPage, PrivacyPolicy } from '../pages';

const AppRouter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRouter;
