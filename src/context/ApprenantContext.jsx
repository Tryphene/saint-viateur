// ApprenantContext.js

import React, { createContext, useState } from "react";

const ApprenantContext = createContext();

const ApprenantProvider = ({ children }) => {
  const [apprenant, setApprenant] = useState([]);
  const [cours, setCours] = useState([]);
  const [ok, setOk] = useState(false)

  return (
    <ApprenantContext.Provider value={{ apprenant, setApprenant, cours, setCours, ok, setOk }}>
      {children}
    </ApprenantContext.Provider>
  );
};

export { ApprenantContext, ApprenantProvider };
