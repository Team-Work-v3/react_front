import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EventPage from "./pages/EventPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
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
  )
}
