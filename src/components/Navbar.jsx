import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

import { AiFillHome } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { FiShoppingBag, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiMail } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";



const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNav = () => setShowNav((prev) => !prev);
    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* LOGO */}
                <div className="logo">
                    <img src="src/assets/Logo-buffet.png" alt="Logo buffet UNaB" />
                </div>

                {/* BUSCADOR */}
                <div className="search-box">
                    <input type="text" placeholder=" Buscar..." />
                </div>

                {/* HAMBURGER */}
                <div className="menu-icon" onClick={toggleNav}>
                    {showNav ? (
                        <AiOutlineClose size={24} />
                    ) : (
                        <GiHamburgerMenu size={24} />
                    )}
                </div>

                {/* CARRITO */}
                <div className="cart-icon">
                    <MdLocalGroceryStore className="nav-icon-cart" />
                </div>

                {/* NAV LINKS MOBILE */}
                <div className={`nav-elements ${showNav ? "active" : ""}`}>
                    <ul>
                        <li>
                            <NavLink
                                to="/home"
                                activeclassname="active"
                                onClick={() => setShowNav(false)}
                            >
                                <AiFillHome className="nav-icon" /> Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/productos"
                                activeclassname="active"
                                onClick={() => setShowNav(false)}
                            >
                                <FaBoxOpen className="nav-icon" /> Productos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contacto"
                                activeclassname="active"
                                onClick={() => setShowNav(false)}
                            >
                                <FiMail className="nav-icon" /> Contacto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                activeclassname="active"
                                onClick={() => setShowNav(false)}
                            >
                                <FiShoppingBag className="nav-icon" /> Mis pedidos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                activeclassname="active"
                                onClick={() => setShowNav(false)}
                            >
                                <FaUserCircle className="nav-icon" /> Mi cuenta
                            </NavLink>
                        </li>


                        <li>
                            <NavLink
                                to="/"
                                activeclassname="active"
                                onClick={() => setShowNav(false)}
                            >
                                <FiLogOut className="nav-icon" /> Cerrar Sesión
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/* DESKTOP LINKS */}
                <div className="desktop-nav">
                    <ul className="right-links">
                        <li><NavLink to="/home">Inicio</NavLink></li>
                        <li><NavLink to="/productos">Productos</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>
                    </ul>
                    <ul className="right-icons">
                        <li><MdLocalGroceryStore className="nav-icon-cart" /></li>
                        <li
                            className={`profile-desktop ${dropdownOpen ? "active" : ""}`}
                            onClick={toggleDropdown}
                        >
                            <FaUserCircle className="nav-icon" />
                            <FiChevronDown className="dropdown-arrow" />
                            {dropdownOpen && (
                                <ul className="dropdown">
                                    <li>
                                        <NavLink to="/">
                                            <FiShoppingBag className="nav-icon" /> Mis pedidos
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            <FaUserCircle className="nav-icon" /> Mi cuenta
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            <FiLogOut className="nav-icon" /> Cerrar sesión
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;