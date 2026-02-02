type SidebarItemProps = {
  icon?: string;
  label: string;
  active?: boolean;
  onClick: () => void;
};

export default function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={onClick}
      type="button"
    >
      {icon && <img src={icon} alt="" className="sidebar-icon" />}
      <span className="sidebar-label">{label}</span>
    </button>
  );
}
