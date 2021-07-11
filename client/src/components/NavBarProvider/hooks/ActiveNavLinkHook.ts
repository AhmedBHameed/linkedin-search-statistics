import {createContext, useContext} from 'react';

const NavBarContext = createContext('1');

const useActiveNavLink = () => useContext(NavBarContext);

export {NavBarContext, useActiveNavLink};
