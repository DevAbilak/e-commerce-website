import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import "../../styles/pages/checkout/checkout.css";
import PaymentSummary from "./PaymentSummary";
import OrderSummary from "./OrderSummary";

const Checkout = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchDeliveryOptionsData = async () => {
      const res = await axios.get(
        "https://e-commerce-backend-6h0s.onrender.com/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(res.data);
    };

    fetchDeliveryOptionsData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummaryData = async () => {
      const res = await axios.get(
        "https://e-commerce-backend-6h0s.onrender.com/api/payment-summary",
      );
      setPaymentSummary(res.data);
    };

    fetchPaymentSummaryData();
  }, [cart]);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/images/cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          {paymentSummary !== null && (
            <PaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
