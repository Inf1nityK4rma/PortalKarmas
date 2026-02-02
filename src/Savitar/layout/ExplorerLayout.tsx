import '../styles/explorer.css';
import '../styles/animations.css';
import ExplorerSidebar from './ExplorerSidebar';
import ExplorerHeader from './ExplorerHeader';
import ExplorerContent from './ExplorerContent';

export default function ExplorerLayout() {
  return (
    <div className="explorer">
      <ExplorerSidebar />
      <div className="explorer-main">
        <ExplorerHeader />
        <ExplorerContent />
      </div>
    </div>
  );
}
