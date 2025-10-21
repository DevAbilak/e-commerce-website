import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import Orders from "./pages/Orders";
import Checkout from "./pages/checkout/Checkout";
import Tracking from "./pages/Tracking";
import NotFound from "./pages/NotFound";
import "./styles/shared/general.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
