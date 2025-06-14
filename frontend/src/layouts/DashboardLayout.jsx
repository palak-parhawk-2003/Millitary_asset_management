import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">Asset System</h1>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "text-white"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/assets"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "text-white"
              }
            >
              Assets
            </NavLink>
            <NavLink
              to="/dashboard/transfers"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "text-white"
              }
            >
              Transfers
            </NavLink>
            <NavLink
              to="/dashboard/assignments"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "text-white"
              }
            >
              Assignments
            </NavLink>
          </nav>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5">
          <p className="text-sm mb-2">Logged in as:</p>
          <p className="text-white font-medium text-sm">{user?.name}</p>
          <p className="text-gray-400 text-xs mb-4">{user?.role}</p>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
