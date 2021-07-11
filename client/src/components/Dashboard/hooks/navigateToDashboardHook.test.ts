import {renderHook} from '@testing-library/react-hooks';

import NAVIGATION_ROUTES from '../../../config/NavigationRoutes';
import {mockHistoryPush} from '../../../setupTests';
import useNavigateToProfile from './navigateToDashboardHook';

it('redirects to "/"', () => {
  const {result} = renderHook(useNavigateToProfile);
  result.current.goToDashboard();

  expect(mockHistoryPush).toHaveBeenCalledWith(
    NAVIGATION_ROUTES.dashboard.path
  );
});
