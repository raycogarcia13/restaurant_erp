import {useItemAsync, storageItemAsync} from "../utils/storage"
import React from 'react';

const AuthContext = React.createContext({
    isLoading: false,
    session:null,
    signIn: () => {

    },
    signOut: () => {}
});


// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  console.log(value);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  console.log("session ",value)
  return value;
}

export function SessionProvider(props) {
  const [ [isLoading, session], setSession] = useItemAsync('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (data) => {
          // Perform sign-in logic here
          setSession(JSON.stringify(data));
          console.log(data);
          const user = data.user;
          console.log(user)
          router.replace(goto_access(user.role?.rol))
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
