
import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";


function ConfirmationPage() {
    const {orderDetails} = useContext(OrderDetailsStore);
    console.log("****** orderDetails: ", orderDetails);
    const orderDate = () => {
        if (orderDetails) {
            let date = new Date(orderDetails.order.dateCreated);
            return (date.toLocaleString());
        }
    };
    const ccExpDate = (): String => {
        if (orderDetails) {
            let date = new Date(orderDetails.customer.ccExpDate);
            return (date.toLocaleString('en-US', {month: 'numeric', year: 'numeric'}));
        }
        return new Date().toLocaleString();
    };

    function maskedCCNumber(ccNumber: String): String {
        const lastFourDigits = ccNumber.slice(-4);
        return lastFourDigits.padStart(ccNumber.length, '*');
    }

    const confirmationNumber = (): String => {
        if (orderDetails) {
            return "Confirmation #: " + orderDetails?.order?.orderId.toLocaleString();
        }
        return "Confirmation Number #";
    };

    return (
        <>{orderDetails === null ?
            <div className={"page-empty-state"}>
                <div className="header-text">
                    <h1>Once you create an order, order details will be here.</h1>
                </div>
            </div>
                :

                <div className="confirmationView">
                    <ul>
                        <li>{confirmationNumber()}</li>
                        <li>{orderDate()}</li>
                    </ul>
                    <ConfirmationTable/>
                    <ul>
                        <li><b>Name: </b> {orderDetails?.customer?.customerName}</li>
                        <li><b>Address: </b> {orderDetails?.customer?.address}</li>
                        <li><b>Email: </b> {orderDetails?.customer?.email}</li>
                        <li><b>Phone: </b> {orderDetails?.customer?.phone}</li>
                        <li><b>Credit Card: </b>{maskedCCNumber(orderDetails?.customer?.ccNumber ?? "")}</li>
                        <li><b>Credit Card Expiry: </b>{ccExpDate()}</li>
                    </ul>
                    <div id="customerInfo"></div>
                </div>
                }</>
            )
        }

            export default ConfirmationPage;