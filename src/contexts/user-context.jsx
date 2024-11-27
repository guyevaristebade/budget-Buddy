import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUsername(response[0].username);
    } catch (e) {
      console.error("Erreur lors de la récupération de l'utilisateur", e);
    }
  };

  const updateUsername = async () => {
    try {
      const response = await getUser();
      setUsername(response[0].username);
    } catch (e) {
      console.error("Erreur lors de la récupération de l'utilisateur", e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};
