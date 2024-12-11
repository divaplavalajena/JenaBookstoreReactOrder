//you Can use the following css file
//
//     .confirmation_table {
//     border: 1px black solid;
//     width: fit-content;
//     margin-top: 1em;
//     margin-bottom: 1em;
// }
//
// .confirmation_td {
//     display: table-cell;
//     padding: 0.5em 0.5em;
//     background-color: white;
//     vertical-align: middle;
// }
//
// .confirmation_tr:nth-child(even) > td {
//     background-color: lightgray;
// }
//
// .confirmation_td:nth-child(1) {
//     text-align: left;
// }
//
// .confirmation_td:nth-child(2) {
//     text-align: center;
// }
//
// .confirmation_td:nth-child(3) {
//     text-align: right;
// }
//
// .checkout-text {
//     margin-top: 40px;
//     margin-left: 50px;
//     margin-bottom:20px;
// }
// .checkout-view {
//     dsiplay: flex;
//     flex-direction: column;
//     border: 1px solid black;
//     border-radius: 10px;
// }

//import '../assets/css/ConfirmationTable.css'

import { asDollarsAndCents } from "../utils";

import { BookItem, OrderDetails } from '../types'

import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {useContext} from "react";

function ConfirmationTable() {
  const { orderDetails} = useContext(OrderDetailsStore);

// A helper function - optional to use
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
  return (
      <table className="confirmation_table">
        {
          orderDetails?.books?.map((book, i) => (

        <tr className="confirmation_tr" key={i}     >
        <td className="confirmation_td">
          {book.title}
        </td>
        <td className = "confirmation_td">{book.bookId}</td>
        <td className = "confirmation_td">{asDollarsAndCents((book.price)*100)}</td>
      </tr>
          ))}
        <tr>
          <td><b>Total :</b></td>
          <td></td>
         <td>{asDollarsAndCents((25.00)*100)}</td>
         </tr>
    </table>
  )}

export default ConfirmationTable;