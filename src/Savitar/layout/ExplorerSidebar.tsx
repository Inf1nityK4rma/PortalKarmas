import { useExplorer } from '../state/explorer.store';
import SidebarItem from '../components/SidebarItem';

/* =========================================================
   EXPLORER SIDEBAR
   Menú izquierdo tipo Windows, futurista y animado
========================================================= */

export default function ExplorerSidebar() {
  const { devices, currentDevice, openDevice } = useExplorer();

  return (
    <aside className="explorer-sidebar">
      {/* Sección: Mis equipos */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Mis equipos</h3>

        <ul className="sidebar-list">
          {devices.map(device => (
            <li key={device.id}>
              <SidebarItem
                icon={device.icon}
                label={device.name}
                active={currentDevice?.id === device.id}
                onClick={() => openDevice(device)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Futuras secciones: Favoritos, Red, etc */}
      {/* <div className="sidebar-section">
            <h3 className="sidebar-title">Favoritos</h3>
          </div> */}
    </aside>
  );
}
