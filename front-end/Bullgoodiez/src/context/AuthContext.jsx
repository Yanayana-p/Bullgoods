import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Corrupted user data:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("isLoggedIn", "true"); // ✅ Set login flag
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn"); // ✅ Clear login flag
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
