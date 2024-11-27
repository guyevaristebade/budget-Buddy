import React from "react";
import { useParams } from "react-router-dom";

export const ItemPage = () => {
  const { _id } = useParams();

  return <div>Test</div>;
};
