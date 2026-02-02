import type { DeviceNode } from '../models/DeviceNode';
import type { FileNode } from '../models/FileNode';
import FileItem from './FileItem';

type FileGridProps = {
  items: Array<DeviceNode | FileNode>;
};

export default function FileGrid({ items }: FileGridProps) {
  return (
    <div className="file-grid">
      {items.map(item => (
        <FileItem key={item.id} node={item} />
      ))}
    </div>
  );
}
