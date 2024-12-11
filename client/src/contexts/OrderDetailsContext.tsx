import {createContext, Dispatch, PropsWithChildren, useReducer} from "react";
import {OrderDetails} from "../types";
import {initialOrderDetailsState, orderDetailsReducer} from "../reducers/OrderDetailsReducer";

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails | null;
    dispatchOrder: Dispatch<any>;
}>({
    orderDetails: initialOrderDetailsState,
    dispatchOrder: () => null
});
OrderDetailsStore.displayName = 'OrderDetailsContext';

export const storageOrderKey = 'orderDetails';

// the rest of the code comes here
function OrderDetailsContext ({ children }:PropsWithChildren<{}>)  {

    const [orderDetails, dispatchOrder] =useReducer(orderDetailsReducer, initialOrderDetailsState,
        (initialState) => {
            try {
                // console.log('orderDetails BEFORE JSON.parse(localStorage.getItem...)', orderDetails);
                const storedOrderDetails = JSON.parse(localStorage.getItem(storageOrderKey) || '{}');
                // console.log('storedOrderDetails AFTER JSON.parse(localStorage.getItem...)', storedOrderDetails);
                return storedOrderDetails as OrderDetails || initialState;
            } catch (error) {
                console.log('Error parsing storedOrderDetails', error);
                return initialState;
            }
        },
    );
    // console.log('orderDetails before JSON stringify', orderDetails);
    localStorage.setItem(storageOrderKey, JSON.stringify(orderDetails));
    return (
        <OrderDetailsStore.Provider value ={{orderDetails, dispatchOrder}}>{children}</OrderDetailsStore.Provider>
    );
}
export default OrderDetailsContext;