import '../assets/css/CategoryBookListItem.css';
import {BookItem} from "../types";
import {CartTypes} from "../reducers/CartReducer";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

function CategoryBookListItem(book:BookItem) {
    const {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        // console.log("-- CategoryId --")
        // console.log(book.categoryId)
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    };
return (
    <li className="book-box">
        <div className="column">
            <div className="row">
                <div className="column">
                    <div className="book-image">
                        <img src={book.imagePath != null ?
                            require("../assets/images/" + book.imagePath) :
                            require("../assets/images/site/placeholder-image.jpg")}
                             alt={book.title}
                        />
                    </div>
                    {book.isPublic && <button className="read-now-button">Read Now</button>}
                </div>
                <div className="column">
                    <div className="book-info">
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                        <div className="book-price">${book.price}</div>
                    </div>
                </div>
            </div>
            <div className="addToCartButtonRow">
                <button className="addToCartButton" onClick={addBookToCart}>Add to Cart</button>
            </div>
        </div>
    </li>
)
}

export default CategoryBookListItem;
