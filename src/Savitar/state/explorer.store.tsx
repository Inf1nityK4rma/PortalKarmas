// RENOMBRA ESTE ARCHIVO A: explorer.store.tsx
// (Sí, cabrón, de .ts a .tsx. Ese es el puto problema)

import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';

import type { DeviceNode } from '../models/DeviceNode';
import type { FileNode } from '../models/FileNode';

import { mock_devices } from '../services/filesystem.mock';

/* =========================================================
   TYPES
========================================================= */

export type ExplorerState = {
  devices: DeviceNode[];
  currentDevice: DeviceNode | null;
  currentPath: FileNode[];
  currentFolder: FileNode | null;
  currentItems: (DeviceNode | FileNode)[];

  selectedIds: string[];
  expandedIds: Set<string>;

  showCreateModal: boolean;
  showInfoModal: boolean;
  showOpenModal: boolean;
  showPasswordPrompt: boolean;

  openDevice: (device: DeviceNode) => void;
  openFolder: (folder: FileNode) => void;
  goBack: () => void;
  goHome: () => void;
  goToPathIndex: (index: number) => void;

  toggleSelect: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  toggleExpanded: (id: string) => void;

  setShowCreateModal: (open: boolean) => void;
  setShowInfoModal: (open: boolean) => void;
  setShowOpenModal: (open: boolean) => void;
  setShowPasswordPrompt: (open: boolean) => void;
};

/* =========================================================
   CONTEXT
========================================================= */

const ExplorerContext = createContext<ExplorerState | null>(null);

/* =========================================================
   PROVIDER
========================================================= */

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [devices] = useState<DeviceNode[]>(mock_devices);

  const [currentDevice, setCurrentDevice] = useState<DeviceNode | null>(null);
  const [currentPath, setCurrentPath] = useState<FileNode[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FileNode | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const currentItems = useMemo<(DeviceNode | FileNode)[]>(() => {
    if (!currentDevice) return devices;
    if (!currentFolder) return currentDevice.root?.children ?? [];
    return currentFolder.children ?? [];
  }, [devices, currentDevice, currentFolder]);

  const clearSelection = useCallback(() => setSelectedIds([]), []);

  const openDevice = useCallback((device: DeviceNode) => {
    setCurrentDevice(device);
    setCurrentPath([]);
    setCurrentFolder(null);
    clearSelection();
  }, [clearSelection]);

  const openFolder = useCallback((folder: FileNode) => {
    if (folder.type !== 'folder') return;
    setCurrentPath(prev => [...prev, folder]);
    setCurrentFolder(folder);
    clearSelection();
  }, [clearSelection]);

  const goBack = useCallback(() => {
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);
      setCurrentFolder(newPath[newPath.length - 1] ?? null);
    } else if (currentDevice) {
      setCurrentDevice(null);
      setCurrentPath([]);
      setCurrentFolder(null);
    }
    clearSelection();
  }, [currentPath, currentDevice, clearSelection]);

  const goHome = useCallback(() => {
    setCurrentDevice(null);
    setCurrentPath([]);
    setCurrentFolder(null);
    clearSelection();
  }, [clearSelection]);

  const goToPathIndex = useCallback((index: number) => {
    if (index < 0 || index >= currentPath.length) return;
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    setCurrentFolder(newPath[newPath.length - 1] ?? null);
    clearSelection();
  }, [currentPath, clearSelection]);

  const toggleSelect = useCallback((id: string, multi = false) => {
    setSelectedIds(prev => {
      if (multi) return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      return prev[0] === id && prev.length === 1 ? [] : [id];
    });
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  }, []);

  const value = useMemo<ExplorerState>(() => ({
    devices,
    currentDevice,
    currentPath,
    currentFolder,
    currentItems,
    selectedIds,
    expandedIds,
    showCreateModal,
    showInfoModal,
    showOpenModal,
    showPasswordPrompt,
    openDevice,
    openFolder,
    goBack,
    goHome,
    goToPathIndex,
    toggleSelect,
    clearSelection,
    toggleExpanded,
    setShowCreateModal,
    setShowInfoModal,
    setShowOpenModal,
    setShowPasswordPrompt,
  }), [
    devices,
    currentDevice,
    currentPath,
    currentFolder,
    currentItems,
    selectedIds,
    expandedIds,
    showCreateModal,
    showInfoModal,
    showOpenModal,
    showPasswordPrompt,
    openDevice,
    openFolder,
    goBack,
    goHome,
    goToPathIndex,
    toggleSelect,
    clearSelection,
    toggleExpanded,
  ]);

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
}

/* =========================================================
   HOOK
========================================================= */

export const useExplorer = (): ExplorerState => {
  const context = useContext(ExplorerContext);
  if (!context) throw new Error('useExplorer debe usarse dentro de ExplorerProvider');
  return context;
};