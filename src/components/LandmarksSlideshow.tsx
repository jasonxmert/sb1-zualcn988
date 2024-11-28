import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ExternalLink } from 'lucide-react';
import { Location } from '../types/location';
import { Landmark } from '../types/landmarks';
import { getWikipediaUrl } from '../utils/wikipedia';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface LandmarksSlideshowProps {
  location: Location | null;
}

export function LandmarksSlideshow({ location }: LandmarksSlideshowProps) {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLandmarks() {
      if (!location?.countryCode) {
        setLandmarks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { getLandmarksByCountry } = await import('../data/landmarks');
        const countryLandmarks = getLandmarksByCountry(location.countryCode);
        setLandmarks(countryLandmarks);
      } catch (err) {
        console.error('Error loading landmarks:', err);
        setError('Failed to load landmarks');
      } finally {
        setLoading(false);
      }
    }

    loadLandmarks();
  }, [location?.countryCode]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !landmarks.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Popular Landmarks in {location?.country}
      </h2>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="h-[400px]"
        watchSlidesProgress
        grabCursor
        loop
      >
        {landmarks.map((landmark) => (
          <SwiperSlide key={landmark.id}>
            <a
              href={getWikipediaUrl(landmark.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group"
            >
              <div className="h-full rounded-lg overflow-hidden shadow-md bg-white transition-all duration-300 group-hover:shadow-xl transform group-hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <img
                    src={landmark.imageUrl}
                    alt={landmark.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1572003414076-9159c2e5e35f?w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {landmark.name.replace(/_/g, ' ')}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                  <p className="text-sm text-gray-600">{landmark.description}</p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}