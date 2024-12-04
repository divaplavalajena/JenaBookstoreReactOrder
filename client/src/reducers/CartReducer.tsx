import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction} from "react";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}

// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] = [];

const findItem = (array: any[], id: number) => array.find((item) => item.id === id);

export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            if (findItem(state, action.id))
                return state.map((cartItem) =>
                    cartItem.id === action.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            return [
                ...state,
                {id:action.item.bookId, book:action.item, quantity: 1 }
            ];
        case CartTypes.REMOVE:
            if (findItem(state, action.id))
                return state.map((cartItem) =>
                    cartItem.id === action.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                ).filter((item) => item.quantity > 0);
            return state;
        case CartTypes.CLEAR:
            return [];
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};