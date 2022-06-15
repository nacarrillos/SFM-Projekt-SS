import React, { createContext, useState } from "react";

export const BauteilContext = createContext();

export const BauteilContextProvider = (props) => {
  const [bauteil, setBauteil] = useState([]);
  const [historie, setHistorie] = useState([]);
  const [userData, setUserData] = useState({});

  return (
    <BauteilContext.Provider
      value={{
        bauteil: bauteil,
        setBauteil,
        historie,
        setHistorie,
        userData,
        setUserData,
      }}
    >
      {props.children}
    </BauteilContext.Provider>
  );
};
