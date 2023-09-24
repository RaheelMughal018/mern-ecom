import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";



const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth > 600 ? 20 : 25,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`product/${product._id}`}>
      <img src={product.image[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <ReactStars {...options} /> <span> ({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
