import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Templates from './pages/Templates';
import Showcase from './pages/Showcase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documentation/*" element={<Documentation />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/showcase" element={<Showcase />} />
    </Routes>
  );
}

export default App;
