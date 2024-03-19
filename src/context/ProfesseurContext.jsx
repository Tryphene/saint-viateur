// ApprenantContext.js

import React, { createContext, useState } from "react";

const ProfesseurContext = createContext();

const ProfesseurProvider = ({ children }) => {
  const [professeur, setProfesseur] = useState([]);
  return (
    <ProfesseurContext.Provider value={{ professeur, setProfesseur }}>
      {children}
    </ProfesseurContext.Provider>
  );
};

export { ProfesseurContext, ProfesseurProvider };
