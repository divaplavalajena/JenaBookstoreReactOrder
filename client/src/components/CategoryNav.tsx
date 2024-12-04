import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CategoryItem} from "../types";
import {Category} from "../contexts/CategoryContext";

function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
  return (
  <nav className="category-nav">
    <ul className="category-buttons">
        {categories.map((category) => (
              <li key={category.categoryId}>
                  <Link className="button unselected-category-button" to={`/categories/${category.name}`}>
                      {category.name}</Link>
              </li>
          ))}
        </ul>
        </nav>
        )
      }

export default CategoryNav;
