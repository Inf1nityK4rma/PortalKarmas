import type { FileNode } from './FileNode';

export type DeviceNode = {
  id: string;
  name: string;
  icon: string;
  root: FileNode;
};
