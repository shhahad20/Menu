import { useEffect, useState } from "react";
import "../styles/signup.scss";
import Axios from "axios";

type CountryType = {
  country: string;
  iso2: string;
  iso3: string;
  cities: string[];
};

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    agreeToPolicy: false,  // Added state for the policy agreement checkbox
  });

  const [countries, setCountries] = useState<CountryType[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const fetchCountries = async () => {
    const response = await Axios.get("https://countriesnow.space/api/v0.1/countries");
    setCountries(response.data.data);
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

    if (!formData.agreeToPolicy) {
      alert("You must agree to the privacy policy before submitting.");
      return;
    }

    console.log('Form Data:', formData);
  };

  return (
    <section id="signup-section">
      <div className="signup-container">
        <h1 className="signup-header">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="name" className="label">First Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Mohammed"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastName" className="label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Ali"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="email" className="label">Email</label>
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
              <label htmlFor="phone" className="label">Phone</label>
              <input
                type="text"
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
              <label htmlFor="password" className="label">Password</label>
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
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
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

          {/* Country and City */}
          <div className="input-pair">
            <div className="input-container">
              <label htmlFor="country" className="label">Country</label>
              <select onChange={handleCountryChange} value={formData.country} className="input">
                <option selected hidden disabled>Select your country</option>
                {countries.map((country) => (
                  <option key={country.country} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="city" className="label">City</label>
              <select onChange={handleCityChange} value={formData.city} className="input" disabled={!formData.country}>
                <option selected hidden disabled>Select your city</option>
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
                checked={formData.agreeToPolicy}
                onChange={handleChange}
                className="check-box"
              />
              I agree to the <a href="/privacy-policy" target="_blank" className="policy-link">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Sign Up</button>

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
