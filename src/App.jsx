import {
  Header,
  Hero,
  MissionSection,
  SolutionsSection,
  PartnershipsSection,
  ServicesSection,
  Footer
} from './components';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MissionSection />
        <SolutionsSection />
        <PartnershipsSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
