import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  React.useEffect(() => {
    if (hash) {
      // Delay allows React to mount target DOM nodes upon navigating to deeply distinct layouts
      setTimeout(() => {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If no hash exists, aggressively snap to absolute top when switching URLs (so footer clicks don't leave you stranded halfway down)
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash, key]);

  return null;
}
