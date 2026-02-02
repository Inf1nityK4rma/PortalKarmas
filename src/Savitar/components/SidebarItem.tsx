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
      {/* ICONO */}
      {icon && (
        <div className="sidebar-icon-wrapper">
          <img src={icon} alt="" className="sidebar-icon" draggable={false} />
        </div>
      )}

      {/* ETIQUETA */}
      <span className="sidebar-label" title={label}>
        {label}
      </span>
    </button>
  );
}
