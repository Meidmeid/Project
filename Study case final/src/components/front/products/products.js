import React from "react";
import "./products.css";

const Products = (props) => {
  const { productItems, handleAddProduct } = props;
  return (
    <div className="products">
      {productItems.map((productItem) => (
        <div key={productItem.id} className="card">
          <div>
            <img
              className="product-image"
              src={productItem.image}
              alt={productItem.name}
            ></img>
          </div>
          <div>
            <h3 className="product.name">{productItem.name}</h3>
          </div>
          <div className="product.price">${productItem.price}</div>
          <div>
            <button
              className="product-add-button"
              onClick={() => handleAddProduct(productItem)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
