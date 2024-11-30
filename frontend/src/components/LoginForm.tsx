import { ChangeEvent,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/signup.scss";
import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";



const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(login(userData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/"); // Redirect to home on successful login
        }});
  } catch (error) {
      // Access error response from the backend
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage); 
  }
    
  };

  return (
    <section id="login-section">
      <div className="login-container">
        <h1 className="login-header">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-pair">
            <div className="login-input-container">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="login-input-container">
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            </div>
          <button type="submit" className="login-submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
          </button>
          <p className="login-link">
          Don&apos;t have an Account? <a href="/signup">Sign Up</a>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
