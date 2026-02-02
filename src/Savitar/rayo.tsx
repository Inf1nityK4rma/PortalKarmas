import { ExplorerProvider } from './state/explorer.store';
import ExplorerLayout from './layout/ExplorerLayout';

export default function Rayo() {
  return (
    <ExplorerProvider>
      <ExplorerLayout />
    </ExplorerProvider>
  );
}
