import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import "../../styles/pages/checkout/checkout.css";
import PaymentSummary from "./PaymentSummary";
import OrderSummary from "./OrderSummary";

const Checkout = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchDeliveryOptionsData = async () => {
      const res = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(res.data);
    };

    fetchDeliveryOptionsData();
  }, []);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/images/cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
