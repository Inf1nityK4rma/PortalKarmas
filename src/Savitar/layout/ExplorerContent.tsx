import { useExplorer } from '../state/explorer.store';
import FileGrid from '../components/FileGrid';

/* =========================================================
   EXPLORER CONTENT
========================================================= */

export default function ExplorerContent() {
  const {
    currentItems,
    currentDevice,
  } = useExplorer();

  // Estado inicial: ningún dispositivo seleccionado
  if (!currentDevice) {
    return (
      <div className="explorer-empty">
        <span className="empty-title">Mis equipos</span>
        <span className="empty-subtitle">
          Selecciona un dispositivo para comenzar
        </span>
      </div>
    );
  }

  // Dispositivo seleccionado pero sin contenido
  if (!currentItems || currentItems.length === 0) {
    return (
      <div className="explorer-empty">
        <span className="empty-title">Carpeta vacía</span>
        <span className="empty-subtitle">
          No hay elementos en esta ubicación
        </span>
      </div>
    );
  }

  return <FileGrid items={currentItems} />;
}
