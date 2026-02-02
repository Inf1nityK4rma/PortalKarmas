import { useExplorer } from '../state/explorer.store';

/* =========================================================
   EXPLORER HEADER
   Barra de ruta tipo Windows (Path Bar)
========================================================= */

export default function ExplorerHeader() {
  const {
    currentDevice,
    currentPath,
    goHome,
    goToPathIndex,
  } = useExplorer();

  return (
    <header className="explorer-header">
      <nav className="path-bar">
        {/* RAÍZ: ESTE EQUIPO */}
        <span
          className="path-item root"
          onClick={goHome}
        >
          Este equipo
        </span>

        {/* DISPOSITIVO */}
        {currentDevice && (
          <>
            <span className="separator">›</span>
            <span
              className="path-item device"
              onClick={() => goToPathIndex(-1)}
            >
              {currentDevice.name}
            </span>
          </>
        )}

        {/* CARPETAS */}
        {currentPath.map((folder, index) => (
          <span
            key={folder.id}
            className="path-segment"
          >
            <span className="separator">›</span>
            <span
              className="path-item folder"
              onClick={() => goToPathIndex(index)}
            >
              {folder.name}
            </span>
          </span>
        ))}
      </nav>
    </header>
  );
}
