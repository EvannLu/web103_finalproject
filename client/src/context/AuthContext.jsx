import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // TODO: Replace with real authentication when ready
  // For now, we're simulating being logged in as George Demo
  const [user, setUser] = useState({
    id: "1", // George Demo's actual ID in the database
    username: "George Demo",
    email: "george@example.com",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Mock login function (replace later with real auth)
  const login = async (email, password) => {
    // TODO: Call real login API
    console.log("Mock login:", email);
    setIsAuthenticated(true);
    setUser({
      id: "george-demo-id",
      username: "George Demo",
      email: email,
    });
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
