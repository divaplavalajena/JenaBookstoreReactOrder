// Contains all the custom types we want to use for our application
import Fantasy from './assets/images/categories/fantasy.jpg';
import SciFi from './assets/images/categories/Dune-Book-Cover.jpg';
import Mistborn from './assets/images/categories/Mistborn-The-Final-Empire-Book-Cover.jpg';
import Mystery from './assets/images/categories/mystery.jpg';
import Romance from './assets/images/categories/romance.jpg';
import Classics from './assets/images/categories/classics.jpg';

//this interface represents the books in our bookstore
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  description: string;
  isFeatured: boolean;
  rating: number;
  imagePath: string;
  categoryId: number;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export const categoryImages: Record<string, any> = {
  scifi   : SciFi,
  fantasy : Mistborn,
  mystery : Mystery,
  romance : Romance,
  classics: Classics
};

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}

export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}