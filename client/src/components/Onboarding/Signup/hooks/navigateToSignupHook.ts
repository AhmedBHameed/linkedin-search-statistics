import {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import NAVIGATION_ROUTES from '../../../../config/NavigationRoutes';

const useNavigateToSignup = () => {
  const history = useHistory();

  const goToSignup = useCallback(() => {
    history.push(NAVIGATION_ROUTES.signup.path);
  }, [history]);

  return {goToSignup};
};

export default useNavigateToSignup;
