/*import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  return <AuthContext.Provider value={[auth,setAuth]}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
  */

import { useContext, createContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize the state with values from localStorage (if available)
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: "" };
  });

  // Whenever auth state changes, save it to localStorage
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
