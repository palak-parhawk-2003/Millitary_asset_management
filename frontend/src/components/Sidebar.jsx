import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 bg-blue-600 text-white rounded'
      : 'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded';

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
        <NavLink to="/assets" className={navLinkClass}>Assets</NavLink>
        <NavLink to="/transfers" className={navLinkClass}>Transfers</NavLink>
        <NavLink to="/assignments" className={navLinkClass}>Assignments</NavLink>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="block px-4 py-2 text-red-600 hover:bg-red-100 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}