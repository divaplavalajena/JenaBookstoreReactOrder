import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import {BookItem} from "../types";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function CategoryBookList() {
    const {name} = useParams();
    const [books, setBooks]  = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/JenaBookstoreReactOrder/api/categories/name/${name}/books`)
            .then((result) => {setBooks(result.data )
                console.log(result.data)
            })
            .catch(console.error);
    }, [name]);
    console.log("** CATEGORY ID HERE **")
    console.log(name)
    console.log(books)
  return (
      <><CategoryNav />
          <section className="category-book-list">
          <ul id="book-boxes">
              {
                  books.map((book:BookItem) =>
                  <CategoryBookListItem key={book.bookId} bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author} description={book.description} isFeatured={book.isFeatured} rating={book.rating} imagePath={book.imagePath} categoryId={book.categoryId}/>
                  )}

          </ul>
          </section>
      </>
)
}

export default CategoryBookList;
