import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Checkout from "./pages/checkout/Checkout";
import Tracking from "./pages/Tracking";
import "./styles/shared/general.css";

// TODO: add favicon images to each pages.
// TODO: build not found page

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="tracking" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
