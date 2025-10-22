import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import Checkout from "./pages/checkout/Checkout";
import Tracking from "./pages/Tracking";
import NotFound from "./pages/NotFound";
import "./styles/shared/general.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const fetchCartData = async () => {
    const res = await axios.get("/api/cart-items?expand=product");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home cart={cart} loadCart={fetchCartData} />} />
        <Route path="orders" element={<Orders cart={cart} />} />
        <Route
          path="checkout"
          element={<Checkout cart={cart} loadCart={fetchCartData} />}
        />
        <Route
          path="tracking/:orderId/:productId"
          element={<Tracking cart={cart} />}
        />
        <Route path="*" element={<NotFound cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
