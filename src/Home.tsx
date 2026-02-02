import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const ambient = document.getElementById('ambient') as HTMLAudioElement | null;
    const hum = document.getElementById('hum') as HTMLAudioElement | null;
    const whoosh = document.getElementById('whoosh') as HTMLAudioElement | null;
    const portalSound = document.getElementById('portal-sound') as HTMLAudioElement | null;
    const loader = document.getElementById('loader');
    const main = document.getElementById('main');
    const portal = document.getElementById('portal');

    // Sonidos ambientales
    ambient?.play().catch(() => {});
    ambient && (ambient.volume = 0.28);
    hum?.play().catch(() => {});
    hum && (hum.volume = 0.35);

    // Loader → mostrar símbolos
    setTimeout(() => {
      loader && (loader.style.opacity = '0');
      setTimeout(() => {
        loader && (loader.style.display = 'none');
        hum?.pause();
        main && (main.style.display = 'flex');
      }, 2200);
    }, 4800);

    // Hover y click en símbolos
    document.querySelectorAll('.symbol').forEach((sym: any) => {
      sym.addEventListener('mouseenter', () => {
        whoosh && (whoosh.currentTime = 0);
        whoosh && (whoosh.volume = 0.45);
        whoosh?.play().catch(() => {});
      });

      sym.addEventListener('click', () => {
        const path = sym.dataset.path;

        sym.style.transition = 'transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sym.style.transform = 'scale(14)';

        portalSound && (portalSound.currentTime = 0);
        portalSound && (portalSound.volume = 0.6);
        portalSound?.play().catch(() => {});

        setTimeout(() => {
          portal && portal.classList.add('active');
          setTimeout(() => {
            navigate(path);
            // Limpia la animación después de navegar para resetear en back
            setTimeout(() => {
              portal && portal.classList.remove('active');
              sym.style.transform = 'scale(1)';
            }, 1000);
          }, 2600);
        }, 900);
      });
    });
  }, [navigate]);

  return (
    <>
      <div id="loader">
        <video src="/img/carga.mp4" autoPlay loop muted playsInline></video>
      </div>

      <div id="portal">
        <div className="swirl"></div>
      </div>

      <div id="main">
        <img src="/img/icono1.png" className="symbol" data-path="/savitar" alt="Savitar Icon" />
        <img src="/img/icono2.png" className="symbol" data-path="/soma" alt="Soma Icon" />
        <img src="/img/icono3.png" className="symbol" data-path="/stephen" alt="Stephen Icon" />
      </div>
    </>
  );
}