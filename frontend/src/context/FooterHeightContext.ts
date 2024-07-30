import { createContext, useContext } from 'react';

export const FooterHeightContext = createContext<number>(0);

export const useFooterHeight = () => useContext(FooterHeightContext);
