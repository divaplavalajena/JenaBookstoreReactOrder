

import  "../assets/css/checkout.css"

import {asDollarsAndCents, isCreditCard, isMobilePhone, isvalidEmail} from '../utils';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import axios from "axios";


function CheckoutPage()
{

   // const getBookImageUrl = function (book: BookItem): string {
   //    let filename = book.title.toLowerCase();
   //    filename = filename.replace(/ /g, "-");
   //    filename = filename.replace(/'/g, "");
   //    filename = filename + ".gif";
   //    try {
   //       return require('../assets/images/books/' + filename);
   //    } catch (_) {
   //       return require('../assets/images/books/the-iliad.gif');
   //    }
   // };

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const {cart, dispatch} = useContext(CartStore);
   const navigate = useNavigate();

   const cartTotalPrice = cart.reduce(
       (accumulator, currentValue) => accumulator + (currentValue.book.price * currentValue.quantity),
       0,
   ); // TO DO code that calculates the total price of your cart

   const cartQuantity = cart.reduce(
       (accumulator, currentValue) => accumulator + currentValue.quantity,
       0,
   ); // TO DO the code that calculates the total number of items in your cart
   const cartTaxes = cartTotalPrice * 0.0825

   const [nameError, setNameError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [ccNumberError, setCCNumberError] = useState("");
   // TO DO error states for the rest of the input elements - DONE

   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:0,ccExpiryYear:0});

   const [checkoutStatus, setCheckoutStatus] = useState("");

   function isValidForm() {
      //TO DO code that returns true is the customer form is valid, false otherwise
      return nameError.length === 0 &&
          addressError.length === 0 &&
          phoneError.length === 0 &&
          emailError.length === 0 &&
          ccNumberError.length === 0 &&
          formData.name.length !== 0 &&
          formData.address.length !== 0 &&
          formData.phone.length !== 0 &&
          formData.email.length !== 0 &&
          formData.ccNumber.length !== 0;
   }

   // TO DO placeOrder function comes here. Needed for project 9 (not 8)
   const placeOrder =  async (customerForm: CustomerForm) =>  {

      const order = { customerForm: customerForm, cart:{itemArray:cart} };

      const orders = JSON.stringify(order);
      console.log(orders);     //you can uncomment this to see the orders JSON on the console
      const url = `http://webdev.cs.vt.edu:8080/JenaBookstoreReactOrder/api/orders`; //'api/orders'; //webdev.cs.vt.edu
      const orderDetails: OrderDetails = await axios.post(url, orders,
          {headers: {
                "Content-Type": "application/json",
             }
          })
          .then((response) => {
             dispatch({type: CartTypes.CLEAR});
             return response.data;
          })
          .catch((error)=>console.log(error));
      console.log("order details: ", orderDetails);
      return orderDetails;
   }

   function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
               setNameError("Name must be at least 4 characters long!");
            }
            else {
                   setNameError("");
                 }
            break;
         case 'address':
            // TO DO for address Validation
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
               setAddressError("Address must be at least 4 characters long!");
            }
            else {
               setAddressError("");
            }
            break;
         case 'phone':
            //TO DO for Phone validation
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(!isMobilePhone(value)) {
               setPhoneError("Phone number is not valid!");
            }
            else {
               setPhoneError("");
            }
            break;
         case 'email':
           //TO DO for email validation
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(!isvalidEmail(value)) {
               setEmailError("Email is not valid!");
            }
            else {
               setEmailError("");
            }
            break;
         case 'ccNumber':
            // TO DO for Credit card validation
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(!isCreditCard(value)) {
               setCCNumberError("Credit card number error!");
            }
            else {
               setCCNumberError("");
            }
            break;
         case 'ccExpiryMonth':
            setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
            break;
         case 'ccExpiryYear':
            setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
            break;
         default:
            break;
      }
   }

  // TO DO submitOrder function comes here. See the project Spec
   async function submitOrder(event:FormEvent) {
      event.preventDefault();
      console.log("Submit order");
      const isFormCorrect =  isValidForm();
      console.log(isFormCorrect);
      if (!isFormCorrect) {
         setCheckoutStatus("ERROR");
      } else {
         setCheckoutStatus("PENDING");
         const orders = await placeOrder({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            ccNumber: formData.ccNumber,
            ccExpiryMonth: formData.ccExpiryMonth,
            ccExpiryYear: formData.ccExpiryYear,
         })
         if(orders) {
            setCheckoutStatus("OK");
            navigate('/confirmation');}
         else{
            console.log("Error placing order");
         }
      }
   }

   return (
       <section className="checkout-cart-table-view">
          <div className="checkout-page-body">
             <div>
                <form
                    className="checkout-form"
                    onSubmit={(event) => submitOrder(event)}
                    method="post"
                >
                   <div>
                      <label htmlFor="fname">Name</label>
                      <input
                          type="text"
                          size={45}
                          name="name"
                          id="fname"
                          value={formData.name}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {nameError && <div className="error"> {nameError}</div>}</>

                   {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                   {/* Together with the error display*/}
                   <div>
                      <label htmlFor="address">Address</label>
                      <input
                          type="text"
                          size={45}
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {addressError && <div className="error"> {addressError}</div>}</>

                   <div>
                      <label htmlFor="email">Email</label>
                      <input
                          type="text"
                          size={45}
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {emailError && <div className="error"> {emailError}</div>}</>

                   <div>
                      <label htmlFor="phone">Phone</label>
                      <input
                          type="text"
                          size={20}
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {phoneError && <div className="error"> {phoneError}</div>}</>

                   <div>
                      <label htmlFor="ccNumber">Card</label>
                      <input
                          type="text"
                          size={20}
                          name="ccNumber"
                          id="ccNumber"
                          value={formData.ccNumber}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>

                   <div>
                      <label htmlFor="ccExpiryMonth">Exp Date</label>
                      <select style={{color: 'black'}} name="ccExpiryMonth" value={formData.ccExpiryMonth}
                              onChange={handleInputChange}>
                         {months.map((month, i) => (
                             <option key={i} value={i + 1}>
                                {month}
                             </option>
                         ))}
                      </select>

                      {/*TO DO the select input for the expiration year. Read the spec */}
                      {/* about this*/}
                      <label htmlFor="ccExpiryYear"></label>
                      <select style={{color: 'black'}} name="ccExpiryYear" value={formData.ccExpiryYear}
                              onChange={handleInputChange}>
                         {years.map((year, i) => (
                             <option key={i} value={year + 1}>
                                {yearFrom(year)}
                             </option>
                         ))}
                      </select>

                   </div>

                   {/* TO DO the checkout box with the total cost, tax) */}
                   {/* and the Complete Purchase button comes here*/}
                   <div>
                      <div className="checkout-view">
                         <div className="checkout-items-row">
                            <label className="">Items ({cartQuantity}):</label>
                            <label className="">{asDollarsAndCents(cartTotalPrice)}</label>
                         </div>
                         <div className="checkout-items-row">
                            <label className="">Taxes:</label>
                            <label className="">{asDollarsAndCents(cartTaxes)}</label>
                         </div>
                         <div className="checkout-items-total-row">
                            <label className="">Total:</label>
                            <label className="">{asDollarsAndCents(cartTotalPrice + cartTaxes)}</label>
                         </div>
                         <button type="submit" className="checkout-btn-primary">Complete Purchase</button>
                      </div>
                   </div>

                   {/*The following code displays different string based on the */}
                   {/*value of the checkoutStatus*/}
                   {/*Note the ternary operator*/}
                   <div>
                      {
                         checkoutStatus !== '' ?
                             <>
                                <section className="checkoutStatusBox">
                                   {(checkoutStatus === 'ERROR') ?
                                       <div style={{color: 'var(--error-red-color)'}}>
                                          Error: Please fix the problems above and try again. All fields are required.
                                       </div> : (checkoutStatus === 'PENDING' ?
                                           <div>
                                              Processing...
                                           </div> : (checkoutStatus === 'OK' ?
                                               <div>
                                                  Order placed...
                                               </div> :
                                               <div>
                                                  An unexpected error occurred, please try again.
                                               </div>))}
                                </section>
                             </>
                             : <></>}
                   </div>

                </form>
             </div>
          </div>

          <div>
             {/*This displays the information about the items in the cart*/}
             <ul className="checkout-cart-info">
                {
                   cart?.map((item, i) => (
                       <div className="checkout-cart-book-item">
                          <div className="checkout-cart-book-image" key={i}>
                             <img src={item.book.imagePath != null ?
                                 require("../assets/images/" + item.book.imagePath) :
                                 require("../assets/images/site/placeholder-image.jpg")}
                                  alt={item.book.title}
                                  className="checkout-cart-info-img"
                                  width="20%"
                                  height="20%"
                             />
                          </div>
                          <div className="checkout-cart-book-info">
                             <div className="checkout-cart-book-title">{ item.book.title }</div>

                             <div className="checkout-cart-book-subtotal">
                                {/*TO DO the total cost of this specific book displayed here*/}
                                <div>{asDollarsAndCents(item.quantity * item.book.price)}</div>
                             </div>
                             <div className="checkout-cart-book-quantity">
                             <button  className="checkout-icon-button inc-button"      onClick={() => {
                                   dispatch({ type: CartTypes.ADD, book:item.book, id: item.book.bookId });
                                }} >
                                   <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                                </button>
                                <span className="checkout-num-button">{item.quantity}</span>&nbsp;
                                {/*<button className="checkout-num-button">{ item.quantity }</button>*/}
                                <button className="checkout-icon-button dec-button"
                                        onClick={() => {
                                           dispatch({ type: CartTypes.REMOVE, book:item.book, id: item.book.bookId });
                                        }}
                                >
                                   <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle} /></i>
                                </button>
                             </div>
                          </div>

                       </div>
                   )) }
             </ul>
          </div>
       </section>
   )}

export default CheckoutPage;