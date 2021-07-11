import React from 'react';
import {NavBarContext} from './hooks/ActiveNavLinkHook';
import useObtainActiveNavLink from './hooks/obtainActiveNavLinkHook';

const NavBarProvider: React.FC = ({children}) => {
  const {activeIndex} = useObtainActiveNavLink();

  return (
    <NavBarContext.Provider value={activeIndex}>
      {children}
    </NavBarContext.Provider>
  );
};

export default NavBarProvider;
