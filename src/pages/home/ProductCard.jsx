import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../Utils/formatMoney";

const ProductCard = ({
  product: {
    id,
    image,
    rating: { stars, count },
    name,
    priceCents,
  },
  loadCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const addProductToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: id,
      quantity,
    });
    await loadCart();
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">{count}</div>
      </div>

      <div className="product-price">{formatMoney(priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={handleQuantityChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-btn"
        onClick={addProductToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
