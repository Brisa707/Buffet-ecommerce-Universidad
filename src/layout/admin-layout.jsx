import AdminSidebar from "@admincomponents/sidebar/admin-sidebar.jsx";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flex: 1}}>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;