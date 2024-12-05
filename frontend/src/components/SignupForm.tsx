import { useEffect, useState } from "react";
import "../styles/signup.scss";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";

type CountryType = {
  country: string;
  iso2: string;
  iso3: string;
  cities: string[];
};

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: 0,
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    age: 0,
    address: "",
    agreeToPolicy: false,
  });
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state: RootState) => state.users
  );
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await Axios.get(
        "https://countriesnow.space/api/v0.1/countries",
        {
          withCredentials: false,
        }
      );
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      alert("Failed to fetch countries. Please try again later.");
    }
  };

  const fetchCities = (countryName: string) => {
    const country = countries.find((c) => c.country === countryName);
    if (country) {
      setCities(country.cities);
    } else {
      setCities([]);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setFormData((prevData) => ({ ...prevData, country: selectedCountry }));
    fetchCities(selectedCountry);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, city: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!formData.agreeToPolicy) {
      alert("You must agree to the privacy policy before submitting.");
      return;
    }
    const userData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      age: formData.age,
      country: formData.country,
      city: formData.city,
    };
    dispatch(registerUser(userData));
  };

  return (
    <section id="signup-section">
      <div className="signup-container">
        <h1 className="signup-header">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="first_name" className="label">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="first_name"
                placeholder="Mohammed"
                value={formData.first_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="last_name" className="label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                placeholder="Ali"
                value={formData.last_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="youremail@hotmail.com"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="phone" className="label">
                Phone
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="age" className="label">
                age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="address" className="label">
                address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          {/* Country and City */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="country" className="label">
                Country
              </label>
              <select
                onChange={handleCountryChange}
                value={formData.country}
                className="input"
              >
                <option selected hidden disabled>
                  Select your country
                </option>
                {countries.map((country) => (
                  <option key={country.country} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="city" className="label">
                City
              </label>
              <select
                onChange={handleCityChange}
                value={formData.city}
                className="input"
                disabled={!formData.country}
              >
                <option selected hidden disabled>
                  Select your city
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Agree to Privacy Policy */}
          <div className="input-container">
            <label className="label">
              <input
                type="checkbox"
                name="agreeToPolicy"
                // checked={formData.agreeToPolicy}
                onChange={handleChange}
                className="check-box"
              />
              I agree to the{" "}
              <a href="/privacy-policy" target="_blank" className="policy-link">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <div className="success-message" style={{ color: "green" }}>
              <p>{successMessage}</p>
            </div>
          )}
          {/* Login Link */}
          <p className="login-link">
            Already have an account? <a href="/login">Log in here</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
