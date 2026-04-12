import React from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function Templates() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '64px' }}>
        <h1 className="title-md">Templates (Coming Soon)</h1>
      </div>
      <Footer />
    </>
  );
}
