import { useExplorer } from '../state/explorer.store';
import SidebarItem from '../components/SidebarItem';

/* =========================================================
   EXPLORER SIDEBAR
========================================================= */

export default function ExplorerSidebar() {
  const {
    devices,
    currentDevice,
    openDevice,
  } = useExplorer();

  return (
    <aside className="explorer-sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Mis equipos</h3>

        {devices.map(device => (
          <SidebarItem
            key={device.id}
            icon={device.icon}
            label={device.name}
            active={currentDevice?.id === device.id}
            onClick={() => openDevice(device)}
          />
        ))}
      </div>
    </aside>
  );
}
