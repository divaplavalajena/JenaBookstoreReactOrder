import '../assets/css/global.css'
import '../assets/css/Cart.css'
import CartTable from "./CartTable";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import { Link } from 'react-router-dom';
import {asDollarsAndCents} from "../utils";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const {cart, dispatch} = useContext(CartStore);
    const cartQuantity = cart.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
    );
    const cartTotal = cart.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.book.price * currentValue.quantity),
        0,
    );
    const clearCart = () => {
        dispatch({ type:CartTypes.CLEAR });
    };
    const isCartEmpty = cartQuantity === 0;
    let cartContentsMessage: string = "";
    if (cartQuantity === 1) {
        cartContentsMessage = `Your shopping cart contains ${cartQuantity} item`;
    } else {
        cartContentsMessage = `Your shopping cart contains ${cartQuantity} items`;
    }
    if (isCartEmpty) {
        return (
            <div className={"page-empty-state"}>
                <div className="header-text">
                    <h1>Your shopping cart is empty</h1>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="column">
                <div className="header-text">
                    <h3>{cartContentsMessage}</h3>
                </div>
                <div className="header-text">
                    <h3>Cart Total: {asDollarsAndCents(cartTotal)} </h3>
                </div>
                <div className="header-text">
                    <button className="clearCartButton" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
            <div className="cartActionButtonRow">
                <button className="cartActionButton" onClick={() => navigate(-1)}>Continue Shopping</button>
                <Link to="/checkout">
                    <button className="cartActionButton">Proceed to Checkout</button>
                </Link>
            </div>
            <CartTable></CartTable>
        </div>
    )
}

export default Cart;