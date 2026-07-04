import { Link } from "react-router";
import "../../styles/pages/checkout/checkout-header.css";
import checkoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";
import { calcCartQuantity } from "../../Utils/calcCartQuantity";

const CheckoutHeader = ({ cart }) => {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/" className="checkout-header-link">
            <p className="logo">E-Merkato</p>
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {calcCartQuantity(cart)} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={checkoutLockIcon} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
