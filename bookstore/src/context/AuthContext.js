import React, { createContext, useState, useCallback } from "react";


export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  userName: null,
  userProfilePic: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);

  const login = useCallback((uid, token, name, profilePic) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setToken(token);
    setUserName(name);
    setUserProfilePic(profilePic);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    setUserName(null);
    setUserProfilePic(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        token,
        userName,
        userProfilePic,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
