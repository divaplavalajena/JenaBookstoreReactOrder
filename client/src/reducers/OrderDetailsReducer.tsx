

import {OrderDetails} from "../types";


export const OrderDetailsTypes = {
    CLEAR:'CLEAR',
    UPDATE: 'UPDATE'
};

type OrderDetailsActions = {
    type: 'CLEAR' | 'UPDATE';
    item: OrderDetails | null;
}

export const initialOrderDetailsState: OrderDetails | null = null;

export const orderDetailsReducer = (state: OrderDetails | null, action: OrderDetailsActions): OrderDetails | null => {
    console.log("orderDetailsReducer before switch statement")
    switch (action.type) {
        case OrderDetailsTypes.CLEAR:
            return null;
        case OrderDetailsTypes.UPDATE:
            console.log("OrderDetailsTypes.UPDATE orderDetailsReducer state", state)
            console.log("OrderDetailsTypes.UPDATE orderDetailsReducer action.item", action.item)
            return action.item;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};