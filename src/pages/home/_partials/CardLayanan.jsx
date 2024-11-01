import { getServicesApi } from '@/services/informationServices';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardLayanan = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesApi();
        if (data.status === 0) {
          setServices(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to load services.');
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    navigate('/transaction', { state: { selectedService: service } });
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-8 overflow-x-auto md:grid-cols-6 lg:grid-cols-12">
      {services.map((service) => (
        <div
          key={service.service_code}
          className="flex flex-col items-center p-2 cursor-pointer"
          onClick={() => handleServiceClick(service)}
        >
          <div className="w-12 h-12 mb-2 hover:scale-110">
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-xs font-normal text-center">
            {service.service_name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default CardLayanan;
