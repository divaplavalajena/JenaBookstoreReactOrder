import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

function AppHeader(){
    const {cart} = useContext(CartStore);
    const cartQuantity = cart.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
    );
return (
    <header>
        <section className="bookstore-logo">
            <Link to="/">
                <img
                    src={require("../assets/images/site/book-nook-logo.png")}
                    alt="Book Nook Logo"
                    width="150px"
                    height="auto"
                />
            </Link>
        </section>
        <section className="title-and-search-bar">
            <section className="search-bar">
                <input id="searchQueryInput" type="text" className="search-bar" placeholder="Search" />
            </section>
            <section className="quick-search-buttons">
                <HeaderDropdown />
                <button className="button">On Sale!</button>
                <button className="button">New Releases</button>
                <button className="button">Best Sellers</button>
            </section>
        </section>
        <section className="header-login-and-cart">
            <button className="button">Login</button>
            <Link to="/cart">
                <button className="cartButton">
                    <div className={"badge"}>{cartQuantity}</div>
                    <img
                        src={require("../assets/images/site/cart.png")}
                        alt="Shopping Cart"
                        width="40px"
                        height="40px"
                    />
                </button>
            </Link>
        </section>
    </header>
)
}

export default AppHeader;

