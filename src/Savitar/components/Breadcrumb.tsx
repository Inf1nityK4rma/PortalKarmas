import { useExplorer } from '../state/explorer.store';

/* =========================================================
   BREADCRUMB
========================================================= */

export default function Breadcrumb() {
  const {
    currentDevice,
    currentPath,
    goHome,
    goToPathIndex,
  } = useExplorer();

  return (
    <nav className="breadcrumb">
      {/* HOME */}
      <span
        className="breadcrumb-item root"
        onClick={goHome}
      >
        Mis equipos
      </span>

      {/* DEVICE */}
      {currentDevice && (
        <span className="breadcrumb-item">
          <span className="breadcrumb-separator">›</span>
          <span onClick={() => goToPathIndex(-1)}>
            {currentDevice.name}
          </span>
        </span>
      )}

      {/* PATH */}
      {currentPath.map((folder, index) => (
        <span className="breadcrumb-item" key={folder.id}>
          <span className="breadcrumb-separator">›</span>
          <span onClick={() => goToPathIndex(index)}>
            {folder.name}
          </span>
        </span>
      ))}
    </nav>
  );
}
