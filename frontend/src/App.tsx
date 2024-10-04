import React from "react";
import Bar from "./Bar";
import About from "./pages/About";
import Guestbook from "./pages/Guestbook";
import Home from "./pages/Home";
import Reserve from "./pages/Reserve";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Bar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
      </div>
    </>
  );
}
