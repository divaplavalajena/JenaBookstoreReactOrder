
import '../assets/css/ConfirmationTable.css'
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
        <td className = "confirmation_td">{asDollarsAndCents((book.price))}</td>
      </tr>
          ))}
        <tr>
          <td className = "confirmation_total"><b>Total :</b></td>
          <td className = "confirmation_total"></td>
         <td className = "confirmation_total">{asDollarsAndCents(orderDetails?.order?.amount ?? 0)}</td>
         </tr>
    </table>
  )}

export default ConfirmationTable;