import { useState } from "react";
import { formatMoney } from "../../Utils/formatMoney";
import axios from "axios";

const CartItemDetails = ({
  cartItem: {
    productId,
    quantity: cartItemQuantity,
    product: { image, name, priceCents },
  },
  handleDeleteCartItem,
  loadCart,
}) => {
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const [quantity, setQuantity] = useState(cartItemQuantity);

  const handleUpdateQuantity = async () => {
    setIsUpdateOn((prev) => !prev);
    if (isUpdateOn) {
      await axios.put(`/api/cart-items/${productId}`, {
        quantity: Number(quantity),
      });
      setIsUpdateOn(false);
      await loadCart();
    }
  };

  const handleInputQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateQuantity();
    } else if (e.key === "Escape") {
      setQuantity(cartItemQuantity);
      setIsUpdateOn(false);
    }
  };

  return (
    <>
      <img className="product-image" src={image} />

      <div className="cart-item-details">
        <div className="product-name">{name}</div>
        <div className="product-price">{formatMoney(priceCents)}</div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdateOn && (
              <input
                type="text"
                className="update-quantity-input"
                value={quantity}
                onChange={handleInputQuantity}
                onKeyDown={handleKeyDown}
              />
            )}
            <span className="quantity-label">{cartItemQuantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleUpdateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={handleDeleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails;
