import { useExplorer } from '../state/explorer.store';
import FileGrid from '../components/FileGrid';

/* =========================================================
   EXPLORER CONTENT
   Área central del explorador (tipo Windows)
========================================================= */

export default function ExplorerContent() {
  const {
    currentItems,
    currentDevice,
    currentPath,
  } = useExplorer();

  /* ---------------------------------------------
     ESTADO: NO HAY DISPOSITIVO SELECCIONADO
     (Vista "Mis equipos")
  --------------------------------------------- */
  if (!currentDevice) {
    return (
      <section className="explorer-content">
        <div className="explorer-empty">
          <span className="empty-title">Mis equipos</span>
          <span className="empty-subtitle">
            Selecciona un dispositivo para comenzar
          </span>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------
     ESTADO: DISPOSITIVO SELECCIONADO
     PERO CARPETA VACÍA
  --------------------------------------------- */
  if (!currentItems || currentItems.length === 0) {
    return (
      <section className="explorer-content">
        <div className="explorer-empty">
          <span className="empty-title">Carpeta vacía</span>
          <span className="empty-subtitle">
            No hay elementos en esta ubicación
          </span>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------
     ESTADO: CONTENIDO NORMAL
  --------------------------------------------- */
  return (
    <section className="explorer-content">
      <FileGrid
        items={currentItems}
        key={currentPath.join('/')}
      />
    </section>
  );
}
