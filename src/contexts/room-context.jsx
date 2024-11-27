import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { getRooms } from "../api";
import { useAuth } from "../hooks";

const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const { user } = useAuth();

  const fetchRooms = useCallback(() => {
    if (user) {
      getRooms()
        .then((data) => {
          setRooms(data);
          console.log("RoomContext successfully fetched", data);
        })
        .catch((error) => {
          console.error(error.message, "RoomContext");
        });
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const refreshRooms = () => {
    getRooms()
      .then((room) => {
        setRooms(room);
      })
      .catch((error) => {
        console.error(error.message, "error refresh room");
      });
  };

  return (
    <RoomsContext.Provider value={{ rooms, refreshRooms }}>
      {children}
    </RoomsContext.Provider>
  );
};
