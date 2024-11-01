import { getBannersApi } from '@/services/informationServices';
import React, { useEffect, useState, useRef } from 'react';

const CardBanner = () => {
  const [images, setImages] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBannersApi();
        if (Array.isArray(response.data.data)) {
          setImages(
            response.data.data.map((banner, index) => ({
              src: banner.banner_image,
              id: `banner${index}`,
            }))
          );
        } else {
          console.error('Expected an array but got:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 1;
        if (
          scrollContainerRef.current.scrollLeft >=
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth
        ) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-10">
      <h2 className="mb-2 text-lg font-semibold">Temukan Promo Menarik</h2>
      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide"
        >
          {images.map((image) => (
            <div key={image.id} className="flex-shrink-0 p-8">
              <img
                src={image.src}
                alt={`Banner ${image.id}`}
                className="w-[250px] h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardBanner;
