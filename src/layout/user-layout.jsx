import Navbar from "@usercomponents/navbar/navbar.jsx";
import Footer from "@usercomponents/footer/footer.jsx";

function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 120px)"}}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default UserLayout;