import {CategoryItem} from "../types";
import {createContext, PropsWithChildren, useEffect, useState} from "react";
import axios from "axios";

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

function CategoryContext ({ children }:PropsWithChildren<{}>)  {
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/JenaBookstoreReactOrder/api/categories')
            .then((result) => {setCategories(result.data )
                console.log(result.data)
            })
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;