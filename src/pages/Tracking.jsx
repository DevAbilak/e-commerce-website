import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import Navbar from "../components/Navbar";
import "../styles/pages/tracking.css";
import dayjs from "dayjs";

const Tracking = ({ cart }) => {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(res.data);
    };

    fetchOrderData();
  }, [orderId]);

  if (order === null) return null;
  const orderDetails = order.products.find((product) => {
    return product.product.id === productId;
  });

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
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
