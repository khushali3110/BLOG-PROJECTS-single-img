import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../api";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function signup(data) {
    const res = await Api.post("/blog/signUp", data);
    alert(res.data.message);
    navigate("/login");
  }

  return (
    <div className="container mt-5 col-md-4">
      <div className="card shadow p-4">
        <h4 className="text-center">Sign Up</h4>

        <form onSubmit={handleSubmit(signup)}>
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

          <button className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
