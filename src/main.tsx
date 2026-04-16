import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./fonts.css";
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

  </StrictMode>,
     <Swiper
  spaceBetween={12}
  loop={true}
  navigation={{
    nextEl: '.custom-swiper-button-right',
    prevEl: '.custom-swiper-button-left',
  }}
  modules={[Navigation]}
  breakpoints={{
    0: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    }
  }}
  className="mySwiper"
></Swiper> 
);

