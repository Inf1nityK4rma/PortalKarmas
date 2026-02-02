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
            :root {
              --bg-red: #1a0000;
              --dark-overlay: rgba(10, 0, 0, 0.75);
              --accent-red: #440000;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body, #root { height: 100%; overflow: hidden; }
            body {
              background: var(--bg-red) url('background.jpg') no-repeat center center fixed;
              background-size: cover;
              font-family: 'Courier New', monospace;
              color: #ccc;
              cursor: url('/img/cursor.png'), auto;
            }
            #cloud-layer {
              position: fixed; inset: 0; pointer-events: none; z-index: 1;
            }
            .cloud {
              position: absolute; width: 200%; height: 100%;
              background: url('/img/nubes.png') repeat-x;
              opacity: 0.45;
              filter: brightness(0.35) contrast(1.1) saturate(0.6);
              animation: drift 240s linear infinite;
            }
            .cloud2 { animation-delay: -120s; }
            @keyframes drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            #loader { position: fixed; inset: 0; background: var(--dark-overlay); display: flex; align-items: center; justify-content: center; z-index: 200; transition: opacity 2s ease-out; }
            #loader video { width: 180px; max-width: 220px; filter: brightness(0) contrast(15) saturate(0); animation: latentPulse 4s ease-in-out infinite; }
            @keyframes latentPulse { 0%, 100% { transform: scale(0.92) rotate(0deg); } 50% { transform: scale(1.08) rotate(8deg); } }

            #main { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; gap: 180px; z-index: 50; }
            .symbol { width: 160px; cursor: pointer; opacity: 0; transform: scale(0.3) translateY(40px); transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s; filter: drop-shadow(0 0 20px rgba(80, 0, 0, 0.6)); animation: manifest 1.8s forwards; }
            .symbol:nth-child(1) { animation-delay: 0.4s; }
            .symbol:nth-child(2) { animation-delay: 0.9s; }
            .symbol:nth-child(3) { animation-delay: 1.4s; }
            @keyframes manifest { to { opacity: 1; transform: scale(1) translateY(0); } }
            .symbol:hover { transform: scale(1.18); filter: drop-shadow(0 0 40px rgba(120, 0, 0, 0.9)); }

            #portal { position: fixed; inset: 0; background: #000; opacity: 0; pointer-events: none; z-index: 150; display: flex; align-items: center; justify-content: center; transition: opacity 1.2s ease; }
            .swirl { width: 80px; height: 80px; background: conic-gradient(#000, #111 20%, #000 40%, #111 60%, #000 80%, #111); border-radius: 50%; animation: vortex 6s linear infinite; transform: scale(0); box-shadow: 0 0 80px 30px rgba(0, 0, 0, 0.95); transition: transform 2.2s cubic-bezier(0.25, 0.1, 0.25, 1); }
            @keyframes vortex { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            #portal.active { opacity: 1; pointer-events: auto; }
            #portal.active .swirl { transform: scale(28); }
          `,
        }}
      />

      <div id="cloud-layer">
        <div className="cloud"></div>
        <div className="cloud cloud2"></div>
      </div>

      <audio id="ambient" loop preload="auto">
        <source src="https://freesound.org/data/previews/371/371277_5121236-lq.mp3" type="audio/mpeg" />
      </audio>
      <audio id="hum" preload="auto">
        <source src="https://www.soundjay.com/mechanical/sounds/transformer-1.mp3" type="audio/mpeg" />
      </audio>
      <audio id="whoosh" preload="auto">
        <source src="https://freesound.org/data/previews/276/276951_5123856-lq.mp3" type="audio/mpeg" />
      </audio>
      <audio id="portal-sound" preload="auto">
        <source src="https://freesound.org/data/previews/387/387186_5121236-lq.mp3" type="audio/mpeg" />
      </audio>

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