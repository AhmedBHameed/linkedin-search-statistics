import {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import NAVIGATION_ROUTES from '../../../../config/NavigationRoutes';

const useNavigateToLogin = () => {
  const history = useHistory();

  const goToLogin = useCallback(() => {
    history.push(NAVIGATION_ROUTES.login.path);
  }, [history]);

  return {goToLogin};
};

export default useNavigateToLogin;
