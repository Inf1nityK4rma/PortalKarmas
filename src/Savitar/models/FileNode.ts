export type FileType = 'file' | 'folder';

export type FileNode = {
  id: string;
  type: FileType;
  name: string;
  icon?: string;
  size?: number;
  description?: string;

  // solo carpetas
  children?: FileNode[];

  // solo archivos
  extension?: string;
  installers?: string[];
  links?: string[];
};
