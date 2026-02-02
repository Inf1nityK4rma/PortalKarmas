import type { MouseEvent } from 'react';
import type { DeviceNode } from '../models/DeviceNode';
import type { FileNode } from '../models/FileNode';
import { useExplorer } from '../state/explorer.store';

/* =========================================================
   TYPES
========================================================= */

type ExplorerNode = DeviceNode | FileNode;

type FileItemProps = {
  node: ExplorerNode;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FileItem({ node }: FileItemProps) {
  const {
    openDevice,
    openFolder,
    toggleSelect,
    selectedIds,
  } = useExplorer();

  const isSelected = selectedIds.includes(node.id);

  const isDevice = 'root' in node;
  const isFolder = !isDevice && node.type === 'folder';
  const isFile = !isDevice && node.type === 'file';

  /* =========================================================
     EVENTS
  ========================================================= */

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleSelect(node.id, e.ctrlKey || e.metaKey);
  };

  const handleDoubleClick = () => {
    if (isDevice) openDevice(node);
    else if (isFolder) openFolder(node);
    // archivos → fase futura (modal abrir / descargar)
  };


  
  /* =========================================================
     ICON
  ========================================================= */

  const icon =
  isDevice
    ? node.icon
    : isFolder
      ? '/img/icons/folder.png'
      : isFile
        ? '/img/icons/file.png'
        : '/img/icons/file.png';

    isDevice
      ? node.icon
      : isFolder
        ? '/img/icons/folder.png'
        : '/img/icons/file.png';

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className={`file-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
    >
      <div className="file-icon">
        <img src={icon} alt="" draggable={false} />
      </div>

      <div className="file-label">
        {node.name}
      </div>
    </div>
  );
}
