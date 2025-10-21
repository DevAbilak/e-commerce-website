import dayjs from "dayjs";
import { formatMoney } from "../../Utils/formatMoney";
import OrdersDetailGrid from "./OrdersDetailGrid";

const OrdersGrid = ({ orders }) => {
  return (
    <div className="orders-grid">
      {orders.length > 0 &&
        orders.map((order) => {
          return (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <OrdersDetailGrid products={order.products} />
            </div>
          );
        })}
    </div>
  );
};

export default OrdersGrid;
