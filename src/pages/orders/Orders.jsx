import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import OrdersGrid from "./OrdersGrid";
import "../../styles/pages/orders.css";

const Orders = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const res = await axios.get("/api/orders?expand=products");
      setOrders(res.data);
    };

    fetchOrdersData();
  }, []);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/images/orders-favicon.png" />
      <title>Orders</title>
      <Navbar cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
