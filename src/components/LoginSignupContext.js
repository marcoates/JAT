import React, { useContext, useState } from "react";

const loginContext = React.createContext();
const loginContextUpdate = React.createContext();
const signupContext = React.createContext();
const signupContextUpdate = React.createContext();

export function useLoginContext() {
    return useContext(loginContext);
  }

  export function useLoginContextUpdate() {
    return useContext(loginContextUpdate);
  }
  
  export function useSignupContext() {
    return useContext(signupContext);
  }

  export function useSignupContextUpdate() {
    return useContext(signupContextUpdate);
  }

  export function JobApplicationsListContextProvider({ children }) {

    const [loginIsVisible, SetLoginIsVisible] = useState(false);
    const [signupIsVisible, SetSignupIsVisible] = useState(false);

  
    return (
      <signupContext.Provider value={loginIsVisible}>
        <loginContextUpdate.Provider value={{SetSignupIsVisible}}>
      <signupContext.Provider value={signupIsVisible}>
        <loginContextUpdate.Provider value={{SetLoginIsVisible}}>
              {children}
        </loginContextUpdate.Provider>
      </signupContext.Provider>
        </loginContextUpdate.Provider>
      </signupContext.Provider>
    );;
  }
