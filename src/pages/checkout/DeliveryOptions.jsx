import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../Utils/formatMoney";

const DeliveryOptions = ({ deliveryOptions, cartItem, loadCart }) => {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        const handleDeliveryOptionChange = async () => {
          await axios.put(
            `https://e-commerce-backend-6h0s.onrender.com/api/cart-items/${cartItem.productId}`,
            {
              deliveryOptionId: deliveryOption.id,
            },
          );
          await loadCart();
        };
        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={handleDeliveryOptionChange}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">
                {deliveryOption.priceCents > 0
                  ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
                  : "Free Shipping"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryOptions;
