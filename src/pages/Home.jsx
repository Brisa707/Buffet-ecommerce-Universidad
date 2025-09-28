
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";


function Home() {
    return (
        <>
            <Navbar />
            <main className="home-container">
            </main>
            <Footer />
        </>
    );
}

export default Home;
