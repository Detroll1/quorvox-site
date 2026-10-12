import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { Contact, Journal, Projects } from './pages/Inner';
import './styles.css';

// HashRouter: GitHub Pages не умеет отдавать index.html на любые пути, а с #/ всё работает из подпапки.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="journal" element={<Journal />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
