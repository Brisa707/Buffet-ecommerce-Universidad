import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const categorias = [
        { id: "bebidas", nombre: "Bebidas", img: "/src/assets/Categorías/Soda.png" },
        { id: "golosinas", nombre: "Golosinas", img: "/src/assets/Categorías/Candy.png" },
        { id: "sandwiches", nombre: "Sándwiches", img: "/src/assets/Categorías/Sandwich.png" },
        { id: "snacks", nombre: "Snacks", img: "/src/assets/Categorías/Potato Chips.png" },
        { id: "postres", nombre: "Postres", img: "/src/assets/Categorías/Cookie.png" },
    ];


    const promociones = [
        { id: 1, nombre: "Café + 2 medialunas", precio: 2000, categoria: "bebidas", img: "/assets/cafe-medialunas.png" },
        { id: 2, nombre: "Sándwich de jamón y queso", precio: 2500, categoria: "sandwiches", img: "/assets/sandwich.png" },
        { id: 3, nombre: "Hamburguesa + papas", precio: 3500, categoria: "sandwiches", img: "/assets/hamburguesa-papas.png" },
        { id: 4, nombre: "Flan con dulce", precio: 1500, categoria: "postres", img: "/assets/flan.png" },
        { id: 5, nombre: "Café con leche", precio: 1800, categoria: "bebidas", img: "/assets/cafe.png" },
        { id: 6, nombre: "Brownie", precio: 1200, categoria: "postres", img: "/assets/brownie.png" }
    ];

    return (
        <>
            <Navbar />
            <main className="home-container">
                <section className="banner-section">
                    <div className="banner-content">
                        <h1>Bienvenido al buffet de la UNaB</h1>
                        <button className="banner-btn" onClick={() => navigate('/productos')}>
                            Ver productos
                        </button>
                    </div>
                </section>

                <section className="home-categorias-section">
                    <h2>Categorías</h2>
                    <div className="home-categorias-list">
                        {categorias.map((cat) => (
                            <div key={cat.id} className="home-categoria-card" onClick={() => navigate('/productos')}>
                                <div className="home-categoria-icon">
                                    <img src={cat.img} alt={cat.nombre} />
                                </div>
                                <span>{cat.nombre}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="promociones-section">
                    <h2>Promociones</h2>
                    <div className="promociones-productos-grid">
                        {promociones.map((promo) => (
                            <ProductCard key={promo.id} producto={promo} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
