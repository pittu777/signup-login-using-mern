import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (error) {
  //     toast.error("Login failed: " + error, {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  // }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/home");
    } catch (err) {
      toast.error(err || "Login failed");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:min-h-screen tw:bg-gray-100">
      <div className="tw:w-full tw:max-w-md tw:p-6 tw:bg-white tw:shadow-md tw:rounded-lg">
        <h2 className="tw:text-2xl tw:font-semibold tw:text-center tw:mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="tw:space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="tw:w-full tw:px-4 tw:py-2 tw:border tw:rounded-lg tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500 my-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="tw:w-full tw:px-4 tw:py-2 tw:border tw:rounded-lg tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="my-2 tw:w-full tw:py-2 tw:text-white tw:bg-green-500 tw:hover:bg-green-700 tw:rounded-lg tw:flex tw:items-center tw:justify-center"
          >
            {status === "loading" ? (
              <svg
                className="tw:animate-spin tw:h-5 tw:w-5 tw:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="tw:opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <circle
                  className="tw:opacity-75 tw:text-white"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="31.4 31.4"
                  strokeLinecap="round"
                ></circle>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="tw:text-center tw:mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="tw:text-blue-600 tw:hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="tw:text-center tw:mt-4">
          <Link
            to="/forgotpassword"
            className="tw:text-blue-600 tw:hover:underline"
          >
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
