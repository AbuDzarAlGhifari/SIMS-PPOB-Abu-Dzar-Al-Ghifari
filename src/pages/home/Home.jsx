import Layout from '@/components/Layout';
import { useState } from 'react';
import CardBanner from './_partials/CardBanner';
import CardLayanan from './_partials/CardLayanan';

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };
  return (
    <>
      <Layout />
      <section className="px-6 mx-auto max-w-7xl md:px-16">
        <CardLayanan onSelectService={handleSelectService} />
        <CardBanner />
      </section>
    </>
  );
};

export default Home;
