import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import App from './App.tsx'
import './index.css'
import SignUp from './pages/SignUp';
import Login from './pages/Login.tsx';
import About from './pages/About.tsx';
import Pricing from './pages/Pricing.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
