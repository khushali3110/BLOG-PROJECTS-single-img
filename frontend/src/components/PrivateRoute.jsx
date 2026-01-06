import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../api";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    Api.get("/blog/checkAuth")
      .then(res => setAuth(res.data.success))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) {
    return <h4 className="text-center mt-5">Checking login...</h4>;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
