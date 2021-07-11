import {renderHook} from '@testing-library/react-hooks';

import NAVIGATION_ROUTES from '../../../config/NavigationRoutes';
import {mockHistoryPush} from '../../../setupTests';
import useNavigateToSignup from './navigateToSignupHook';

it(`redirects to "${NAVIGATION_ROUTES.signup.path}"`, () => {
  const {result} = renderHook(useNavigateToSignup);
  result.current.goToSignup();

  expect(mockHistoryPush).toHaveBeenCalledWith(NAVIGATION_ROUTES.signup.path);
});
