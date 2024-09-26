import { ChangeEvent,useState } from "react";
import "../styles/signup.scss";



const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setUserData((prevState) => {
        return { ...prevState, [name]: value } });
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



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
          <button type="submit" className="login-submit-btn">Login</button>
          <p className="login-link">
          Don&apos;t have an Account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
