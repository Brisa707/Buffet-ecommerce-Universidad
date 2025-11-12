import Navbar from "@usercomponents/navbar/navbar.jsx";
import Footer from "@usercomponents/footer/footer.jsx";

function UserLayout({ children }) {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default UserLayout;