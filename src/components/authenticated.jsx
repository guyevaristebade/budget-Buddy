import React from "react";

import { AuthenticationProvider } from "../contexts";

export const Authenticated = ({ children }) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
};
