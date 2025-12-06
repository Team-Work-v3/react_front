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
  )
}
