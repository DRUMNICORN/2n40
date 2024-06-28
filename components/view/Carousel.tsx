import React, { useEffect, useRef } from 'react';
// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import styles from './Carousel.module.scss';
import { ContentType } from '@/app/types';
import Swiper from 'swiper';
import ContentContainer from '../core/content/ContentContainer';

// Swiper.use([Navigation, Pagination, Scrollbar]);

interface EntityCardCarouselProps {
  contents: ContentType[];
}

const Carousel: React.FC<EntityCardCarouselProps> = ({ contents }) => {
  const swipeRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swipeRef.current) {
      swiperInstance.current = new Swiper(swipeRef.current, {
        loop: contents.length >= 2,
        direction: 'horizontal',
        // keyboard: {
        //   enabled: true,
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
          snapOnRelease: true,
          dragSize: 'auto',
        },
        navigation: {
          nextEl: '#next', // Use the class names defined in your CSS
          prevEl: '#prev',
        },
      });
  
      return () => {
        if (swiperInstance.current) {
          swiperInstance.current.destroy(true, true);
          swiperInstance.current = null;
        }
      };
    }
  }, [contents]);
  

  return (
    <div className={`swiper-container ${styles.container}`} ref={swipeRef}>
      <div className="swiper-wrapper">
        {contents.map((content, index) => (
          <div className={`swiper-slide ${styles.card}`} key={index}>
            <ContentContainer
              content={content}
              onConnectionClick={(entry) => {}}
              showDetailsOverlay={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Carousel;
