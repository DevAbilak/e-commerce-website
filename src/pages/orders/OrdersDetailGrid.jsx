import { Fragment } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router";
import buyAgainIcon from "../../assets/images/icons/buy-again.png";

const OrdersDetailGrid = ({ products, orderId, loadCart }) => {
  return (
    <div className="order-details-grid">
      {products.map((product) => {
        const addProductToCart = async () => {
          await axios.post(
            "https://e-commerce-backend-6h0s.onrender.com/api/cart-items",
            {
              productId: product.product.id,
              quantity: 1,
            },
          );
          await loadCart();
        };
        return (
          <Fragment key={product.product.id}>
            <div className="product-image-container">
              <img src={product.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{product.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {product.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message" onClick={addProductToCart}>
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${orderId}/${product.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrdersDetailGrid;
