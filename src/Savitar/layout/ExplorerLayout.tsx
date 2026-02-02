import '../styles/explorer.css';
import '../styles/animations.css';
import ExplorerSidebar from './ExplorerSidebar';
import ExplorerHeader from './ExplorerHeader';
import ExplorerContent from './ExplorerContent';

/* =========================================================
   EXPLORER LAYOUT
   Estructura tipo Windows con Sidebar + Header + Content
========================================================= */

export default function ExplorerLayout() {
  return (
    <div className="explorer">
      {/* Sidebar izquierdo */}
      <aside className="explorer-sidebar">
        <ExplorerSidebar />
      </aside>

      {/* Área principal */}
      <div className="explorer-main">
        {/* Barra superior de ruta */}
        <ExplorerHeader />

        {/* Contenido central */}
        <div className="explorer-content-wrapper">
          <ExplorerContent />
        </div>
      </div>
    </div>
  );
}
