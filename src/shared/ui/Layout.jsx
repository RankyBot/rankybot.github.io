import React, {useEffect, useRef} from 'react';
import Header from './Header';
import Footer from './Footer';
import GuildSidebar from './GuildSidebar';
import './Layout.css';

// eslint-disable-next-line react/prop-types
export default function Layout({children}) {
  const layoutRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const getHeaderElement = () => headerRef.current?.querySelector(
        '.app-header');

    const updateLayoutMetrics = () => {
      const headerHeight = getHeaderElement()?.offsetHeight ?? 0;
      const footerTop = footerRef.current?.getBoundingClientRect().top
          ?? window.innerHeight;
      const footerOverlap = Math.max(0, window.innerHeight - footerTop);
      const footerEatOpacity = footerOverlap > 0 ? 1 : 0;

      layoutRef.current?.style.setProperty(
          '--app-header-height',
          `${headerHeight}px`,
      );

      layoutRef.current?.style.setProperty(
          '--app-footer-overlap',
          `${footerOverlap}px`,
      );

      layoutRef.current?.style.setProperty(
          '--app-footer-eat-opacity',
          `${footerEatOpacity}`,
      );
    };

    let frameId = null;

    const scheduleMetricsUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateLayoutMetrics();
      });
    };

    updateLayoutMetrics();

    const resizeObserver = typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(scheduleMetricsUpdate);

    const headerElement = getHeaderElement();

    if (resizeObserver && headerElement) {
      resizeObserver.observe(headerElement);
    }

    if (resizeObserver && footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    window.addEventListener('resize', scheduleMetricsUpdate);
    window.addEventListener('scroll', scheduleMetricsUpdate, {passive: true});

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleMetricsUpdate);
      window.removeEventListener('scroll', scheduleMetricsUpdate);
    };
  }, []);

  return (
      <div className="app-layout" ref={layoutRef}>
        <div ref={headerRef}>
          <Header/>
        </div>
        <main className="app-main">
          <GuildSidebar/>
          <div className="app-content">{children}</div>
        </main>
        <div ref={footerRef}>
          <Footer/>
        </div>
      </div>
  );
}

