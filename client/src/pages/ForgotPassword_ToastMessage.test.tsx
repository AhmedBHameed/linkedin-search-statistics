/**
 * Why this is another test for ForgotPassword
 * @see https://stackoverflow.com/questions/56496998/how-to-restore-a-mock-created-with-jest-mock
 */
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Space} from 'antd';

import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import NAVIGATION_ROUTES from '../config/NavigationRoutes';
import {
  mockConsoleErrorFun,
  mockHistoryPush,
  mockMediaQuery,
} from '../setupTests';
import {md} from '../styles/mediaQueries';
import {lightTheme} from '../styles/Theme';
import {mockForgotPassword} from '../test/utils/generate';
import ForgotPassword from './ForgotPassword';

mockConsoleErrorFun();

const mockForgotPasswordHook = jest.fn();
jest.mock(
  '../components/ForgotPassword/hooks/forgotPasswordHook',
  () => () => ({
    handleForgotPassword: mockForgotPasswordHook,
  })
);

const MOCK_FORGOT_PASSWORD = mockForgotPassword();

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <Router>
        <Space>
          <ForgotPassword />
        </Space>
      </Router>
    </ThemeProvider>
  );
}

describe('ForgotPassword', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('ForgotPassword error toast message', () => {
    beforeAll(() => {
      // jest.clearAllMocks();
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it(`redirects to "${NAVIGATION_ROUTES.signup.path}" when toast message signup link clicked`, async () => {
      mockForgotPasswordHook.mockRejectedValueOnce(new Error('async error'));

      const {getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('email-input'), {
          target: {value: MOCK_FORGOT_PASSWORD.email},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('forgot-password-form'));
        await waitFor(() => {});

        jest.advanceTimersByTime(3001);

        fireEvent.click(await screen.findByTestId('close-notification-button'));
        await waitFor(() => {});
      });

      expect(mockForgotPasswordHook).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith(
        NAVIGATION_ROUTES.signup.path
      );
    });
  });
});
