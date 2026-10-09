import { useState } from 'preact/hooks';
import { TabRouting } from '../../utils';

export const TabButton = ({
  open,
  routing,
  icon,
  onNavigate,
}: {
  open: boolean;
  routing: TabRouting;
  icon: preact.JSX.Element | null;
  onNavigate: (route: string) => void;
}) => {
  const [openLabel, setOpenLabel] = useState<boolean>(false);

  return (
    <>
      <button
        className={`sidebar-button ${location.pathname === routing.route && 'selected'}`}
        onClick={() => onNavigate(routing.route)}
        onMouseOver={() => setOpenLabel(!open)}
        onMouseLeave={() => setOpenLabel(false)}
      >
        {open ? <p>{routing.name}</p> : icon}
      </button>

      {openLabel && (
        <div class='sidebar-button-label'>
          <p>{routing.name}</p>
        </div>
      )}
    </>
  );
};
