import React from "react";
import { Link } from "react-router-dom";

function Products({ product }) {
  const { id, title, subname, price, thumbnail } = product;

  return (
    <div className="product-card">
      <Link to={`/goods/${id}`}>
        <img src={`/${thumbnail}`} alt={title} className="product-img" />
        <h3 className="product-title">{title}</h3>
        <p className="product-subname">{subname}</p>
        <p className="product-price">
          {parseInt(price.discounted).toLocaleString()}원
        </p>
        <p className="product-original">
          <del>{price.original}</del>
        </p>
        <p className="product-discount-rate">{price.discountRate}%</p>
      </Link>
    </div>
  );
}

export default Products;
