import React, {useState} from "react"

const MainContext = React.createContext();

const MainContextProvider = ({children}) => {
  const [jwt, setJwt] = useState('');
  const [user, setUser] = useState('');

  return(
    <MainContext.Provider value={{jwt, setJwt, user, setUser}}>
      {children}
    </MainContext.Provider>
  )
}

export {MainContext, MainContextProvider}