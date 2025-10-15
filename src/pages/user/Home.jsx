import ProductCard from "../../components/productCard/ProductCard";
import "../../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    { id: 2, nombre: "Sándwich + Coca-Cola", precio: 2500, categoria: "sandwiches", img: "/assets/sandwich-coca.png" },
    { id: 3, nombre: "Hamburguesa + papas", precio: 3500, categoria: "sandwiches", img: "/assets/hamburguesa-papas.png" },
    { id: 4, nombre: "Ensalada fresca", precio: 2100, categoria: "snacks", img: "/assets/ensalada.png" },
    { id: 5, nombre: "Brownie", precio: 1200, categoria: "postres", img: "/assets/brownie.png" },
    { id: 6, nombre: "Chocolate", precio: 1200, categoria: "golosinas", img: "/assets/Chocolate.png" }
  ];

  // Función para añadir productos (Promociones)
  const handleAddToCart = (producto) => {
    console.log("Añadido al carrito:", producto);
  };

  // Carrusel automático del Hero
  useEffect(() => {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".dot");

    const showSlide = (n) => {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
        if (i === n) {
          slide.classList.add("active");
          dots[i].classList.add("active");
        }
      });
    };

    const nextSlide = () => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    };

    const prevSlide = () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      showSlide(slideIndex);
    };

    const interval = setInterval(nextSlide, 5000);

    document.querySelector(".hero-next").onclick = nextSlide;
    document.querySelector(".hero-prev").onclick = prevSlide;
    dots.forEach((dot, i) => (dot.onclick = () => showSlide((slideIndex = i))));

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="home-container">

        {/* Hero Carrusel */}
        <section className="hero-carousel">
          <div className="hero-slide active">
            <div className="hero-content">
              <h1>Buffet UNaB</h1>
              <p>Disfrutá de la mejor comida con variedad y calidad</p>
              <button className="btn-primary" onClick={() => navigate("/productos")}>
                Ver productos
              </button>
            </div>
            <img src="/src/assets/Hero1.png" alt="Buffet UNaB" />
          </div>

          <div className="hero-slide">
            <div className="hero-content">
              <h1>Sabores que te acompañan</h1>
              <p>Desde el desayuno hasta la merienda</p>
              <button className="btn-primary" onClick={() => navigate("/productos")}>
                Ver menú
              </button>
            </div>
            <img src="/src/assets/Hero2.png" alt="Sabores" />
          </div>

          <div className="hero-slide">
            <div className="hero-content">
              <h1>Pedidos rápidos</h1>
              <p>Hacé tu pedido sin filas ni esperas</p>
              <button className="btn-primary" onClick={() => navigate("/productos")}>
                Pedir ahora
              </button>
            </div>
            <img src="/src/assets/Hero3.png" alt="Pedidos rápidos" />
          </div>

          {/* Flechas */}
          <button className="hero-prev">&#10094;</button>
          <button className="hero-next">&#10095;</button>

          {/* Indicadores */}
          <div className="hero-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section>

        {/* Banners */}
        <section className="home-banners">
          <div className="banner-card">
            <img src="/src/assets/CardImage1.png" alt="Promo del día" />
            <div className="banner-text">
              <h3>Pedí desde tu aula</h3>
              <p>Sin filas, sin esperas</p>
              <button className="btn-secondary" onClick={() => navigate("/productos")}> Ver productos</button>
            </div>
          </div>

          <div className="banner-card">
            <img src="/src/assets/CardImage2.png" alt="Desayuno" />
            <div className="banner-text">
              <h3>Un Desayuno Perfecto</h3>
              <p>Para tu mañana</p>
              <button className="btn-secondary" onClick={() => navigate("/productos")}> Ver más</button>
            </div>
          </div>

          <div className="banner-card">
            <img src="/src/assets/CardImage3.png" alt="Snacks" />
            <div className="banner-text">
              <h3>Promo Snacks</h3>
              <p>¡No te lo pierdas!</p>
              <button className="btn-secondary" onClick={() => navigate("/productos")}> Ver más</button>
            </div>
          </div>

          <div className="banner-card">
            <img src="/src/assets/CardImage4.png" alt="Bebidas" />
            <div className="banner-text">
              <h3>Refresca tu día</h3>
              <p>Variedad de bebidas para elegir</p>
              <button className="btn-secondary" onClick={() => navigate("/productos")}> Ver más</button>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="home-categorias-section">
          <h2>Categorías</h2>
          <div className="home-categorias-list">
            {categorias.map((cat) => (
              <div
                key={cat.id}
                className="home-categoria-card"
                onClick={() => navigate("/productos")}
              >
                <div className="home-categoria-icon">
                  <img src={cat.img} alt={cat.nombre} />
                </div>
                <span>{cat.nombre}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Promociones */}
        <section className="promociones-section">
          <h2>Promociones</h2>
          <div className="promociones-productos-grid">
            {promociones.map((promo) => (
              <ProductCard key={promo.id} producto={promo} onAddToCart={handleAddToCart} /> 
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;

