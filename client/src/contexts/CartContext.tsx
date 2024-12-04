import {createContext, Dispatch, PropsWithChildren, useEffect, useReducer} from "react";
import {cartReducer, initialCartState} from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});
CartStore.displayName = 'CartContext';

export const storageKey = 'cart';

// the rest of the code comes here
function CartContext ({ children }:PropsWithChildren<{}>)  {

    // @ts-ignore
    // const [cart, dispatch] = useReducer(cartReducer, initialCartState);
    const [cart, dispatch] =useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );
    localStorage.setItem(storageKey, JSON.stringify(cart));
    return (
        <CartStore.Provider value ={{cart, dispatch}}>{children}</CartStore.Provider>
    );
}
export default CartContext;