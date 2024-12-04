import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {CategoryItem} from "../types";
import {Category} from "../contexts/CategoryContext";

function HeaderDropdown() {
    const categories = useContext<CategoryItem[]>(Category);
  return (
      <div className="header-dropdown">
          <button className="button categories-button">Categories
              <img
                  src={require("../assets/images/site/down-caret.png")}
                  alt="Down caret"
                  width="12px"
                  height="6px"
              />
          </button>
          <ul>
              {categories.map((item) =>
                  <li key={item.categoryId}>
                  <Link to={`/categories/${item.name}`}>
                      {item.name}</Link>
                  </li>)}
          </ul>

      </div>

  )
}

export default HeaderDropdown

