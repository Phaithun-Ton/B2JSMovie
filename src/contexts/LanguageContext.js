import { createContext, useState } from "react";

const LanguageContext = createContext();

function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("EN");
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContextProvider;

export { LanguageContext };
