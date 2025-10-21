import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "./ProductCard";
import "../../styles/pages/index.css";

const Home = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    };

    fetchProductsData();
  }, []);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />
      <Navbar cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              loadCart={loadCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
