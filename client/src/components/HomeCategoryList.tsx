import '../assets/css/HomeCategoryList.css';
import {categoryImages, CategoryItem} from '../types';
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";
import {Link} from "react-router-dom";

const categoryImageFileName = (category: CategoryItem) => {
  let name = category.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}`;
};

function HomeCategoryList(){
  const categories = useContext<CategoryItem[]>(Category);
    return(

  <ul className ="category-image-items">
      {categories.map((category) => (
          <li className="category-image-items-li" key={category.categoryId}>
            <Link to={`/categories/${category.name}`}>
            <img src={categoryImages[categoryImageFileName(category)]}
                 alt="book.title" className="book-image"
            />
            <div className="category-image-items-div"> {category.name} </div>
            </Link>
          </li>
      ))}
  </ul>
    )
}

export default HomeCategoryList;
