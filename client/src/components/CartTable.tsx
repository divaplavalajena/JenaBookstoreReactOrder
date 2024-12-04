import  "../assets/css/CartTable.css"
import {ShoppingCartItem} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import {asDollarsAndCents} from "../utils";

// const getBookImageUrl = function (book: BookItem): string {
//     let filename = book.title.toLowerCase();
//     filename = filename.replace(/ /g, "-");
//     filename = filename.replace(/'/g, "");
//     filename = filename + ".gif";
//     try {
//         return require('../assets/images/books/' + filename);
//     } catch (_) {
//         return require('../assets/images/books/the-iliad.gif');
//     }
// };
function CartTable() {
    const {cart, dispatch} = useContext(CartStore);
    const removeBookFromCart = (item: ShoppingCartItem) => {
        dispatch({ type: CartTypes.REMOVE, item:item.book, id:item.book.bookId });
    };
    const addBookToCart = (item: ShoppingCartItem) => {
        dispatch({ type:CartTypes.ADD, item:item.book, id:item.book.bookId });
    }
    return (

        <div className="cart-table">
            <div className ="cart-list-ul">
                <div className="table-heading">
                    <div className="heading-book">Book</div>
                    <div className="heading-price">Price / Quantity</div>
                    <div className="heading-subtotal">Amount</div>
                </div>
                {cart.map((item:ShoppingCartItem) =>
                    <div key={item.id} className="cart-list-li">
                        <div className="cart-book-image">
                            <img className="cart2" src={item.book.imagePath != null ?
                                require("../assets/images/" + item.book.imagePath) :
                                require("../assets/images/site/placeholder-image.jpg")}
                                 alt={item.book.title}
                            />
                        </div>
                        <div className="cart-book-title">{item.book.title}</div>
                        <div className="cart-book-price">{asDollarsAndCents(item.book.price)}</div>
                        <div className="cart-book-quantity">
                            <button className="icon-button inc-button" onClick={() => addBookToCart(item)} >
                                <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                            </button>
                            <span className="quantity">{item.quantity}</span>&nbsp;
                            <button className="icon-button dec-button" onClick={() => removeBookFromCart(item)}>
                                <i className="fas fa-minus-circle"> <FontAwesomeIcon icon={faMinusCircle}/></i>
                            </button>
                        </div>
                        <div className="cart-book-subtotal">{ asDollarsAndCents(item.quantity * item.book.price) }</div>
                        <div className="line-sep"></div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CartTable;