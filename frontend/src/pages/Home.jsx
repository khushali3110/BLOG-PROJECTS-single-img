import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h2>Home Page (Protected)</h2>
      <p>Welcome! You are logged in.</p>
      <Link to="/blogs" className="btn btn-primary mt-3">
        Go to Blog Management
      </Link>
    </div>
  );
};