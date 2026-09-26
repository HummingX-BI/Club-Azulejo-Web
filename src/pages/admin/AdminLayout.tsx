import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="p-8">
      <h1>AdminLayout</h1>
      <Outlet />
    </div>
  );
}
