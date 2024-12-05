import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../redux/slices/userSlice";

const ActivateAccount: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

  const activateAccount = async () => {
    try {
      const response = await activateUser(String(token));
      setMessage(response.message);
      setTimeout(() => navigate("/login"), 5000); // Redirect to login after 5 seconds
    } catch (err) {
      console.error(err);
    //   setError("Failed to activate account.");
    }
  };

  React.useEffect(() => {
    if (token) {
      activateAccount();
    }
  }, [token]); // Call activation only once on page load

  return (
    <div>
      {message && <h2>{message}</h2>}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
};

export default ActivateAccount;
