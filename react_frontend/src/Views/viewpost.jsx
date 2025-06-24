import React from 'react';
import './ViewPost.css';

function ProductComponent() {
  return (
    <div className="product-container">
      <div className="product-image">
        <img
          src="https://static.vecteezy.com/system/resources/previews/035/232/930/non_2x/ai-generated-gym-dumbles-on-transparent-background-ai-generated-png.png"
          alt="Product Image"
        />
      </div>
      <div className="product-details">
        <h1 className="product-title">Sample Product Name</h1>
        <p className="product-description">
          This is a detailed description of the product. It highlights key features,
          benefits, and other important information to help users make an informed decision.
        </p>
        <p className="product-price">$49.99</p>
        <p className="product-info">Weight: 5kg</p>
        <p className="product-info">Size: 30x20x10 cm</p>
        <p className="product-info">Color: Black</p>
        <p>Category: Fitness Equipment</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductComponent;