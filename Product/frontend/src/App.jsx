import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);

      let url = "http://localhost:3000/products?limit=20";

      if (category) {
        url += `&category=${category}`;
      }

      if (!reset && cursor) {
        url += `&cursorUpdatedAt=${cursor.updated_at}`;
        url += `&cursorId=${cursor.id}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (reset) {
        setProducts(data.products || []);
      } else {
        setProducts((prev) => [
          ...prev,
          ...(data.products || []),
        ]);
      }

      setCursor(data.nextCursor);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCursor(null);
    fetchProducts(true);
  }, [category]);

  return (
    <div className="container">

      <nav className="navbar">
        <div className="logo">Product Browser</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Products</li>
          <li>Categories</li>
          <li>About</li>
        </ul>
      </nav>

      <div className="header">
        <h1>Product Browser Dashboard</h1>

        <p className="subtitle">
          Browse 200,000+ products
        </p>

        <div className="loaded-count">
          Loaded: {products.length} Products
        </div>
      </div>

      <div className="toolbar">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Home">Home</option>
        </select>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>

            <p>
              <strong>ID:</strong> {product.id}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p className="price">
              ₹{product.price}
            </p>

            <p>
              <strong>Updated:</strong>{" "}
              {new Date(product.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <button
        className="load-btn"
        onClick={() => fetchProducts()}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More Products"}
      </button>

    </div>
  );
}

export default App;