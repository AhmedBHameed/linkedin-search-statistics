import {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import NAVIGATION_ROUTES from '../../../config/NavigationRoutes';

const useNavigateToDashboard = () => {
  const history = useHistory();

  const goToDashboard = useCallback(() => {
    history.push(NAVIGATION_ROUTES.dashboard.path);
  }, [history]);

  return {goToDashboard};
};

export default useNavigateToDashboard;
