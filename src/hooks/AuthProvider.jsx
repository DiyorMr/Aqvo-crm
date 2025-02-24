import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accToken"));
  const navigate = useNavigate();

  const loginAction = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("https://aqvo.limsa.uz/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.statusCode === 200) {
        setUser(res.data.data);
        setToken(res.data.tokens.access_token);
        localStorage.setItem("accToken", res.data.tokens.access_token);
        navigate("/statistics");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("accToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
