import {renderHook} from '@testing-library/react-hooks';
import {BrowserRouter as Router} from 'react-router-dom';
import NAVIGATION_ROUTES from '../../../config/NavigationRoutes';
import {mockLocationPathname} from '../../../setupTests';
import useObtainActiveNavLink from './obtainActiveNavLinkHook';

describe('ObtainActiveNavLinkHook', () => {
  describe('Functionality', () => {
    it(`returns string result of "1" when location equal to "${NAVIGATION_ROUTES.dashboard.path}"`, async () => {
      mockLocationPathname.mockImplementation(() => ({
        pathname: NAVIGATION_ROUTES.dashboard.path,
      }));

      const {result} = renderHook(useObtainActiveNavLink, {
        wrapper: Router,
      });

      expect(result.current.activeIndex).toBe('1');
    });

    it(`returns string result of "2" when location equal to "${NAVIGATION_ROUTES.patients.path}"`, async () => {
      mockLocationPathname.mockImplementation(() => ({
        pathname: NAVIGATION_ROUTES.patients.path,
      }));

      const {result} = renderHook(useObtainActiveNavLink, {
        wrapper: Router,
      });

      expect(result.current.activeIndex).toBe('2');
    });

    it(`returns string result of "3" when location include or equal "${NAVIGATION_ROUTES.orderAnalysis.path}"`, async () => {
      mockLocationPathname.mockImplementation(() => ({
        pathname: NAVIGATION_ROUTES.orderAnalysis.path,
      }));

      const {result} = renderHook(useObtainActiveNavLink, {
        wrapper: Router,
      });

      expect(result.current.activeIndex).toBe('3');
    });

    it(`returns string result of "4" when location equal to "${NAVIGATION_ROUTES.profileAccount.path}"`, async () => {
      mockLocationPathname.mockImplementation(() => ({
        pathname: NAVIGATION_ROUTES.profileAccount.path,
      }));

      const {result} = renderHook(useObtainActiveNavLink, {
        wrapper: Router,
      });

      expect(result.current.activeIndex).toBe('4');
    });
  });
});
