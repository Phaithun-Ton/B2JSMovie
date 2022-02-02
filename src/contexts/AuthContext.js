import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { clearToken, getToken, setToken } from "../services/localStorage";
import { ErrorContext } from "./ErrorContext";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    if (getToken()) {
      axios
        .get("/users/me")
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };
  const logout = () => {
    clearToken();
    setUser(null);
  };

  const updateUser = (value) => {
    setUser((prev) => ({ ...prev, ...value }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export { AuthContext };
