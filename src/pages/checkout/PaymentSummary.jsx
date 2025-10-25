import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../Utils/formatMoney";

const PaymentSummary = ({
  paymentSummary: {
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents,
  },
  loadCart,
}) => {
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    await axios.post("/api/orders");
    await loadCart();
    navigate("/orders");
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
        <div data-testid="total-quantity">Items ({totalItems}):</div>
        <div
          className="payment-summary-money"
          data-testid="product-total-money"
        >
          {formatMoney(productCostCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money" data-testid="shipping-money">
          {formatMoney(shippingCostCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div
          className="payment-summary-money"
          data-testid="total-cost-before-tax"
        >
          {formatMoney(totalCostBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money" data-testid="tax-money">
          {formatMoney(taxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money" data-testid="order-total-money">
          {formatMoney(totalCostCents)}
        </div>
      </div>

      <button
        className="place-order-button button-primary"
        data-testid="place-order-btn"
        onClick={handlePlaceOrder}
      >
        Place your order
      </button>
    </div>
  );
};

export default PaymentSummary;
