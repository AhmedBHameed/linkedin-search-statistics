import {useMemo, useState} from 'react';
import {useLocation} from 'react-router-dom';
import NAVIGATION_ROUTES from '../../../config/NavigationRoutes';

const {dashboard, statistics, jobs} = NAVIGATION_ROUTES;

const useObtainActiveNavLink = () => {
  const {pathname} = useLocation();
  const [activeIndex, setActiveIndex] = useState<string>('1');

  useMemo(() => {
    switch (true) {
      case pathname === dashboard.path:
        setActiveIndex('1');
        break;

      case pathname === statistics.path:
        setActiveIndex('2');
        break;

      case pathname === jobs.path:
        setActiveIndex('3');
        break;

      default:
        setActiveIndex('0');
    }
  }, [pathname, setActiveIndex]);

  return {
    activeIndex,
  };
};

export default useObtainActiveNavLink;
