import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { BarChart } from "../components/graphics";

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user === undefined) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <h1>Home page</h1>
      {user && user.user && <h2>Hello {user.user.username}</h2>}
    </div>
  );
};
