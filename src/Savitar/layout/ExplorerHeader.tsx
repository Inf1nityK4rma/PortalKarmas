import { useExplorer } from '../state/explorer.store';

export default function PathBar() {
  const { currentDevice, currentPath, goHome, goToPathIndex } = useExplorer();

  return (
    <nav className="path-bar">
      <span className="path-item home" onClick={goHome}>
        Este equipo
      </span>

      {currentDevice && (
        <>
          <span className="separator">›</span>
          <span className="path-item">
            {currentDevice.name}
          </span>
        </>
      )}

      {currentPath.map((folder, index) => (
        <span key={folder.id}>
          <span className="separator">›</span>
          <span
            className="path-item"
            onClick={() => goToPathIndex(index)}
          >
            {folder.name}
          </span>
        </span>
      ))}
    </nav>
  );
}
