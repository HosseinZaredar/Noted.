import React, {createContext, useSatet, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [username, setUsername] = useState('');

  return(
    <UserContext.Provider value={{username, setUsername}}>
      {props.children}
    </UserContext.Provider>
  );
}