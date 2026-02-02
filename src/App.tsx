import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Rayo from './Savitar/rayo';
import Lobo from './Soma/lobo';
import Atomo from './Stephen/atomo';

function App() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
/* =========================================================
   VARIABLES GLOBALES / IDENTIDAD VISUAL
========================================================= */
:root {
  --bg-red: #1a0000;
  --bg-black: #050000;

  --overlay-strong: rgba(5, 0, 0, 0.85);
  --overlay-soft: rgba(10, 0, 0, 0.6);

  --glow-soft: rgba(120, 0, 0, 0.5);
  --glow-strong: rgba(200, 0, 0, 0.95);

  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-soft: cubic-bezier(0.25, 0.8, 0.25, 1);

  --symbol-size-desktop: 160px;
  --symbol-size-mobile: 130px;

  --z-background: 0;
  --z-clouds: 1;
  --z-main: 50;
  --z-portal: 150;
  --z-loader: 200;
}

/* =========================================================
   RESET BASE
========================================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  background:
    radial-gradient(circle at center, #220000 0%, #050000 70%),
    url('/img/background.jpg') no-repeat center center fixed;
  background-size: cover;

  font-family: 'Courier New', monospace;
  color: #ccc;

  cursor: url('/img/cursor.png'), auto;
  user-select: none;
}

/* ===== 3D VERTICAL CAROUSEL ===== */
.carousel-3d {
  position: fixed;
  inset: 0;
  display: none;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  z-index: 60;
}

@media (max-width: 900px) {
  .carousel-3d {
    display: flex;
  }

  #main {
    display: none !important;
  }
}

.carousel-card {
  position: absolute;
  width: 130px;
  transition:
    transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.4s ease;
  filter: drop-shadow(0 0 40px rgba(150, 0, 0, 0.7));
  cursor: pointer;
}

/* =========================================================
   ATMÓSFERA NUBES
========================================================= */
#cloud-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--z-clouds);
  overflow: hidden;
}

.cloud {
  position: absolute;
  width: 220%;
  height: 100%;
  left: 0;
  top: 0;

  background: url('/img/nubes.png') repeat-x;
  opacity: 0.45;

  filter:
    brightness(0.35)
    contrast(1.15)
    saturate(0.6);

  animation: cloud-drift 260s linear infinite;
}

.cloud2 {
  opacity: 0.25;
  animation-delay: -130s;
  filter: blur(1px) brightness(0.3);
}

@keyframes cloud-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* =========================================================
   LOADER – VIDEO DE CARGA (FORZADO ANTI-FONDO BLANCO)
========================================================= */
#loader {
  position: fixed;
  inset: 0;

  /* Fondo profundo para absorber blancos */
  background:
    radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0.85) 45%,
      rgba(0, 0, 0, 0.95) 100%
    );

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: var(--z-loader);
  transition: opacity 2.2s ease;

  /* Aísla blending */
  isolation: isolate;
}

/* CAPA OSCURA ENCIMA DEL VIDEO */
#loader::before {
  content: '';
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at center,
      transparent 30%,
      rgba(0, 0, 0, 0.65) 65%,
      rgba(0, 0, 0, 0.9) 100%
    );

  z-index: 1;
  pointer-events: none;
}

/* ⚠️ SOLO carga.mp4 */
#loader .loader-video {
  position: relative;
  z-index: 2;

  width: 180px;
  max-width: 220px;

  /* Bajamos opacidad SOLO del blanco */
  opacity: 0.3;

  mix-blend-mode: luminosity;

  /* FILTROS AGRESIVOS */
  filter:
    contrast(1.45)
    brightness(0.7)
    saturate(0)
  
  transform-origin: center;
  animation: loader-pulse 4.8s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
}

/* Pulso orgánico */
@keyframes loader-pulse {
  0% {
    transform: scale(0.9) rotate(0deg);
  }
  45% {
    transform: scale(1.08) rotate(5deg);
  }
  100% {
    transform: scale(0.9) rotate(0deg);
  }
}

/* =========================================================
   BLOQUEO TOTAL DE UI DURANTE CARGA
========================================================= */
body[data-loading="true"] #main,
body[data-loading="true"] .carousel-3d,
body[data-loading="true"] #portal {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.98);
}

body[data-loading="false"] #main,
body[data-loading="false"] .carousel-3d {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 1.2s ease, transform 1.2s ease;
}


/* =========================================================
   MAIN – ICONOS
========================================================= */
#main {
  position: fixed;
  inset: 0;

  display: none;
  align-items: center;
  justify-content: center;

  gap: 180px;
  padding: 0 40px;

  z-index: var(--z-main);
}

/* ================= ICONOS ================= */
.symbol {
  width: var(--symbol-size-desktop);
  cursor: pointer;

  opacity: 0;
  transform: scale(0.85) translateY(40px);

  filter: drop-shadow(0 0 20px var(--glow-soft));

  animation: symbol-manifest 1.6s var(--ease-out-back) forwards;
  transition:
    transform 0.35s var(--ease-soft),
    filter 0.35s ease;
}

.symbol:nth-child(1) { animation-delay: 0.4s; }
.symbol:nth-child(2) { animation-delay: 0.9s; }
.symbol:nth-child(3) { animation-delay: 1.4s; }

@keyframes symbol-manifest {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ================= HOVER PC ================= */
@media (hover: hover) and (pointer: fine) {
  .symbol:hover {
    transform: scale(1.18);
    filter: drop-shadow(0 0 60px var(--glow-strong));
  }
}

/* =========================================================
   PORTAL
========================================================= */
#portal {
  position: fixed;
  inset: 0;

  background: #000;
  opacity: 0;
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: var(--z-portal);
  transition: opacity 1.2s ease;
}

#portal.active {
  opacity: 1;
  pointer-events: auto;
}

.swirl {
  width: 80px;
  height: 80px;

  border-radius: 50%;
  background:
    conic-gradient(
      #000,
      #111 20%,
      #000 40%,
      #111 60%,
      #000 80%,
      #111
    );

  box-shadow: 0 0 80px 30px rgba(0,0,0,0.95);

  transform: scale(0);
  animation: vortex-spin 6s linear infinite;
  transition: transform 2.2s cubic-bezier(0.25, 0.1, 0.25, 1);
}

#portal.active .swirl {
  transform: scale(28);
}

@keyframes vortex-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* =========================================================
   RESPONSIVE – MÓVIL (BASE PARA SLIDER 3D)
========================================================= */
@media (max-width: 900px) {
  #main {
    gap: 40px;
    overflow-x: auto;

    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    padding: 70px 20px;
    perspective: 1200px;
  }

  .symbol {
    width: var(--symbol-size-mobile);
    flex-shrink: 0;

    scroll-snap-align: center;
    transform: scale(0.75) translateZ(-200px);
    opacity: 0.6;
  }

  .symbol.active {
    transform: scale(1.25) translateZ(120px);
    opacity: 1;
    z-index: 5;
  }
}
          `,
        }}
      />

      <div id="cloud-layer">
        <div className="cloud"></div>
        <div className="cloud cloud2"></div>
      </div>

      <audio id="ambient" loop preload="auto" />
      <audio id="hum" preload="auto" />
      <audio id="whoosh" preload="auto" />
      <audio id="portal-sound" preload="auto" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savitar" element={<Rayo />} />
        <Route path="/soma" element={<Lobo />} />
        <Route path="/stephen" element={<Atomo />} />
      </Routes>
    </>
  );
}

export default App;
