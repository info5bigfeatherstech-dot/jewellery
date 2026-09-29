import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToPageTop } from '../../hooks/useLenis';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  // Instant scroll reset before paint
  useLayoutEffect(() => {
    scrollToPageTop(true);
  }, [pathname, search]);

  // Frame backup to ensure dynamic route switches (shop, category, product) never linger at footer
  useEffect(() => {
    scrollToPageTop(true);
    const frameId = requestAnimationFrame(() => {
      scrollToPageTop(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, [pathname, search]);

  return null;
};
