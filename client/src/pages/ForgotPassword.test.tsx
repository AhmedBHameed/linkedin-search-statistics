import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {Space} from 'antd';

import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {mockConsoleErrorFun, mockMediaQuery} from '../setupTests';
import {md} from '../styles/mediaQueries';
import {lightTheme} from '../styles/Theme';
import {mockForgotPassword} from '../test/utils/generate';
import ForgotPassword from './ForgotPassword';

mockConsoleErrorFun();

const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();
const mockCloseNotification = jest.fn();
jest.mock('../components/ToastMessage/hooks/toastMessageHook', () => () => ({
  notifyError: mockNotifyError,
  notifySuccess: mockNotifySuccess,
  closeNotification: mockCloseNotification,
}));

const mockGoToSignup = jest.fn();
jest.mock('../components/Signup/hooks/navigateToSignupHook', () => () => ({
  goToSignup: mockGoToSignup,
}));

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

  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });

  describe('Form validation', () => {
    it('shows helper text as a hint when submitting invalid data.', async () => {
      const {findAllByTestId, getByTestId} = renderComponent();

      act(() => {
        fireEvent.submit(getByTestId('forgot-password-submit-button'));
      });

      const inputErrors = await findAllByTestId('input-error');

      expect(inputErrors[0].textContent).toBe('Field required');
      expect(mockGoToSignup).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);
      expect(mockForgotPasswordHook).toHaveBeenCalledTimes(0);
    });

    it('submits valid data and show successful toast message.', async () => {
      const {getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('email-input'), {
          target: {value: MOCK_FORGOT_PASSWORD.email},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('forgot-password-form'));
        await waitFor(() => {});

        jest.advanceTimersByTime(3000);
      });

      expect(mockForgotPasswordHook).toHaveBeenCalledTimes(1);
      expect(mockForgotPasswordHook).toHaveBeenCalledWith(MOCK_FORGOT_PASSWORD);

      expect(mockGoToSignup).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);

      expect(mockNotifySuccess).toHaveBeenCalledTimes(1);
      expect(mockNotifySuccess).toHaveBeenCalledWith({
        message: 'forgotPassword.success.forgotPasswordSubmitted.title',
        description: 'forgotPassword.success.forgotPasswordSubmitted.message',
      });
    });

    it('triggers toast message when async throw an error', async () => {
      mockForgotPasswordHook.mockRejectedValueOnce(new Error('async error'));

      const {getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('email-input'), {
          target: {value: MOCK_FORGOT_PASSWORD.email},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('forgot-password-form'));
        await waitFor(() => {});

        jest.advanceTimersByTime(3000);
      });

      expect(mockForgotPasswordHook).toHaveBeenCalledTimes(1);
      expect(mockForgotPasswordHook).toHaveBeenCalledWith(MOCK_FORGOT_PASSWORD);
      // close-notification-button
      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);

      expect(mockGoToSignup).toHaveBeenCalledTimes(0);

      expect(mockNotifyError).toHaveBeenCalledTimes(1);
    });
  });
});
