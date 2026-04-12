import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DocLayout from './components/docs/DocLayout';
import DocPage from './pages/DocPage';
import Templates from './pages/Templates';
import TemplateDetails from './pages/TemplateDetails';
import Showcase from './pages/Showcase';
import ScrollManager from './components/shared/ScrollManager';

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/templates/:id" element={<TemplateDetails />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/documentation" element={<DocLayout />}>
        <Route index element={<Navigate to="/documentation/introduction" replace />} />
        <Route path=":slug" element={<DocPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
