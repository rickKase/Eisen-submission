import { createContext, useContext } from 'react';

export const NavbarHeightContext = createContext<number>(0);

export const useNavbarHeight = () => useContext(NavbarHeightContext);
