import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================================================
   DATA – ICONOS / RUTAS
========================================================= */
const CARDS = [
  { src: '/img/icono1.png', path: '/savitar', label: 'Savitar' },
  { src: '/img/icono2.png', path: '/soma', label: 'Soma' },
  { src: '/img/icono3.png', path: '/stephen', label: 'Stephen' },
];

export default function Home() {
  const navigate = useNavigate();

  /* =========================================================
     REFS
  ========================================================= */
  const mainRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);

  /* =========================================================
     STATE – CAROUSEL 3D MÓVIL
  ========================================================= */
  const [activeIndex, setActiveIndex] = useState(0);

  /* =========================================================
     EFECTO PRINCIPAL – AUDIO + LOADER + MANIFESTACIÓN
  ========================================================= */
  useEffect(() => {
    document.body.setAttribute('data-loading', 'true');

    const ambient = document.getElementById('ambient') as HTMLAudioElement | null;
    const hum = document.getElementById('hum') as HTMLAudioElement | null;

    if (ambient) {
      ambient.volume = 0.28;
      ambient.play().catch(() => {});
    }

    if (hum) {
      hum.volume = 0.35;
      hum.play().catch(() => {});
    }

    const loader = loaderRef.current;
    const main = mainRef.current;

    const loaderTimeout = setTimeout(() => {
      if (loader) loader.style.opacity = '0';

      const showTimeout = setTimeout(() => {
        if (loader) loader.style.display = 'none';
        if (main) main.style.display = 'flex';
        document.body.setAttribute('data-loading', 'false');
      }, 2000);

      return () => clearTimeout(showTimeout);
    }, 2200);

    return () => clearTimeout(loaderTimeout);
  }, []);

  /* =========================================================
     SLIDER 3D VERTICAL – SOLO MÓVIL (SWIPE)
  ========================================================= */
  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const delta = startY - e.changedTouches[0].clientY;

      if (delta > 50) {
        setActiveIndex(i => Math.min(i + 1, CARDS.length - 1));
      } else if (delta < -50) {
        setActiveIndex(i => Math.max(i - 1, 0));
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  /* =========================================================
     PORTAL / NAVEGACIÓN
  ========================================================= */
  const openPortal = (path: string) => {
    const whoosh = document.getElementById('whoosh') as HTMLAudioElement | null;
    const portalSound = document.getElementById('portal-sound') as HTMLAudioElement | null;

    if (whoosh) {
      whoosh.currentTime = 0;
      whoosh.play().catch(() => {});
    }

    if (portalSound) {
      portalSound.currentTime = 0;
      portalSound.play().catch(() => {});
    }

    portalRef.current?.classList.add('active');

    setTimeout(() => {
      navigate(path);
    }, 1600);
  };

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <>
      {/* ================= LOADER ================= */}
      <div id="loader" ref={loaderRef}>
        <video
          className="loader-video"
          src="/img/carga.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* ================= PORTAL ================= */}
      <div id="portal" ref={portalRef}>
        <div className="swirl" />
      </div>

      {/* ================= DESKTOP – ICONOS CON HOVER ================= */}
      <div id="main" ref={mainRef}>
        {CARDS.map(card => (
          <div
            key={card.label}
            className="symbol-wrap"
            onClick={() => openPortal(card.path)}
          >
            <img
              src={card.src}
              className="symbol"
              draggable={false}
              alt={card.label}
            />
          </div>
        ))}
      </div>

      {/* ================= MÓVIL – 3D VERTICAL CAROUSEL ================= */}
      <div className="carousel-3d">
        {CARDS.map((card, index) => {
          const offset = index - activeIndex;

          return (
            <img
              key={card.label}
              src={card.src}
              className="carousel-card"
              style={{
                transform: `
                  translateY(${offset * 140}px)
                  translateZ(${offset === 0 ? 140 : -160}px)
                  rotateX(${offset * -28}deg)
                  scale(${offset === 0 ? 1.15 : 0.85})
                `,
                opacity: offset === 0 ? 1 : 0.45,
                zIndex: 10 - Math.abs(offset),
              }}
              draggable={false}
              onClick={() => offset === 0 && openPortal(card.path)}
              alt={card.label}
            />
          );
        })}
      </div>
    </>
  );
}