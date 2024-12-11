// You can use the following Css file
// .confirmationView {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     margin: 1em auto;
// }
// ul {
//     text-align: left;
// }
// ul > li {
//     margin: 1em;
// }


//import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";


function ConfirmationPage()
{
    const { orderDetails } = useContext(OrderDetailsStore);
    console.log("****** orderDetails: ", orderDetails);
    const orderDate =  () => {
        if (orderDetails) {
            let date = new Date(orderDetails.order.dateCreated);
            return (date.toLocaleString());
        }
    };
    const ccExpDate =  (): Date =>{
        if (orderDetails) {
            return new Date(orderDetails.customer.ccExpDate);
        }
        return new Date();
    };

    return(
        <div className="confirmationView">
            <ul>
                <li>Confirmation #: 123456789</li>
                <li>{orderDate()}</li>
            </ul>
            <ConfirmationTable />
            <ul>
                <li><b>Name:</b> { orderDetails?.customer?.customerName}</li>
                <li><b>Address:</b> { orderDetails?.customer?.address }</li>
                <li><b>Email:</b> { orderDetails?.customer?.email }</li>
                <li><b>Phone:</b> 703-555-1212</li>
                <li><b>Credit Card:</b> **** **** **** 1111 (08-2020)</li>
            </ul>
            <div id="customerInfo"></div>
        </div>
    )
}
export default ConfirmationPage;