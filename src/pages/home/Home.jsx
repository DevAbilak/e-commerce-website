import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "./ProductCard";
import "../../styles/pages/index.css";

const Home = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />
      <Navbar cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
