import {renderHook} from '@testing-library/react-hooks';

import NAVIGATION_ROUTES from '../../../config/NavigationRoutes';
import {mockHistoryPush} from '../../../setupTests';
import useNavigateToLogin from './navigateToLoginHook';

it(`redirects to "${NAVIGATION_ROUTES.dashboard.path}"`, () => {
  const {result} = renderHook(useNavigateToLogin);
  result.current.goToLogin();

  expect(mockHistoryPush).toHaveBeenCalledWith(NAVIGATION_ROUTES.login.path);
});
