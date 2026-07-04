import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductCard from "./ProductCard";
import "../../styles/pages/index.css";

const Home = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    fetch("https://e-commerce-backend-6h0s.onrender.com/api/products").then(
      (res) => console.log(res.json()),
    );
    const fetchProductsData = async () => {
      let res;
      if (search) {
        res = await axios.get(
          `https://e-commerce-backend-6h0s.onrender.com/api/products?search=${search}`,
        );
      } else {
        res = await axios.get(
          "https://e-commerce-backend-6h0s.onrender.com/api/products",
        );
      }
      setProducts(res.data);
    };

    fetchProductsData();
  }, [search]);

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
