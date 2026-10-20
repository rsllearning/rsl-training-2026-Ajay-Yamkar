import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export function useRegisteredUser() {
  return useContext(UserContext);
}
