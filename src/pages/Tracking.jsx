import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import Navbar from "../components/Navbar";
import "../styles/pages/tracking.css";
import dayjs from "dayjs";

const Tracking = ({ cart }) => {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  // console.log(order);

  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await axios.get(
        `https://e-commerce-backend-6h0s.onrender.com/api/orders/${orderId}?expand=products`,
      );
      setOrder(res.data);
    };

    fetchOrderData();
  }, [orderId]);

  if (order === null) return null;
  const orderDetails = order.products.find((product) => {
    return product.product.id === productId;
  });

  const totalDeliveryTimeMs =
    orderDetails?.estimatedDeliveryTimeMs - order?.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order?.orderTimeMs;

  const deliveryProgress =
    totalDeliveryTimeMs !== 0
      ? (timePassedMs / totalDeliveryTimeMs) * 100
      : 100;

  const deliveryProgressPercentage =
    deliveryProgress > 100 ? "100%" : `${deliveryProgress}%`;

  let status;
  if (deliveryProgress < 33) {
    status = "isPreparing";
  } else if (deliveryProgress >= 33 && deliveryProgress < 100) {
    status = "isShipped";
  } else {
    status = "isDelivered";
  }
  return (
    <div>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/tracking-favicon.png"
      />
      <title>Tracking</title>
      <Navbar cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(orderDetails.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderDetails.product.name}</div>

          <div className="product-info">Quantity: {orderDetails.quantity}</div>

          <img className="product-image" src={orderDetails.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                status === "isPreparing" && "current-status"
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${
                status === "isShipped" && "current-status"
              }`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                status === "isDelivered" && "current-status"
              }`}
            >
              {deliveryProgress >= 100 ? "Delivered on" : "Arriving on"}
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: deliveryProgressPercentage }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
