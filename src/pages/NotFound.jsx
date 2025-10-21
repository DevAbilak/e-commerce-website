import { Link } from "react-router";
import Navbar from "../components/Navbar";
import "../styles/pages/notFound.css";

const NotFound = ({ cart }) => {
  return (
    <>
      <Navbar cart={cart} />
      <div className="not-found-page">
        <h1>Page not found :(</h1>
        <Link to="/" className="button-primary navigate-btn">
          Go to home page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
