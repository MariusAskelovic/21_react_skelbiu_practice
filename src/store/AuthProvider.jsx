import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  email: '',
  isUserLoggedIn: '',
});

AuthContext.displayName = 'Auth';

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState({});
  const email = fireUser.email;
  const isUserLoggedIn = !!email;

  const ctx = { email: email, isUserLoggedIn: isUserLoggedIn };
  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

// const ctx = useContext(AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
