import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../api";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function login(data) {
    const res = await Api.post("/blog/login", data);

    if (res.data.success) {
      alert("Login successful");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="container mt-5 col-md-4">
      <div className="card shadow p-4">
        <h4 className="text-center">Login</h4>

        <form onSubmit={handleSubmit(login)}>
          <input
            {...register("email")}
            className="form-control mb-3"
            placeholder="Email"
            required
          />

          <input
            {...register("password")}
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
          />

          <button className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
