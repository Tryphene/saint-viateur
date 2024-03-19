// ApprenantContext.js

import React, { createContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState([]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin}}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
