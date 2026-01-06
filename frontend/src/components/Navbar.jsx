import { Link, useNavigate } from "react-router-dom";
import Api from "../api";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await Api.get("/user/logout");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          📝 Blog Panel
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
          </ul>

          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
