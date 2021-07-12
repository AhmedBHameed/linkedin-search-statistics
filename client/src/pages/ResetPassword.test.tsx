import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {Space} from 'antd';

import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {mockConsoleErrorFun, mockMediaQuery} from '../setupTests';
import {md} from '../styles/mediaQueries';
import {lightTheme} from '../styles/Theme';
import ResetPassword from './ResetPassword';

mockConsoleErrorFun();

const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();
jest.mock('../components/ToastMessage/hooks/toastMessageHook', () => () => ({
  notifyError: mockNotifyError,
  notifySuccess: mockNotifySuccess,
}));

const mockGoToLogin = jest.fn();
jest.mock('../components/Login/hooks/navigateToLoginHook', () => () => ({
  goToLogin: mockGoToLogin,
}));

const mockResetPasswordHook = jest.fn();
jest.mock('../components/ResetPassword/hooks/resetPasswordHook', () => () => ({
  handleResetPassword: mockResetPasswordHook,
}));

const MOCK_RESET_PASSWORD = {
  newPassword: 'Test@123123',
  confirmPassword: 'Test@123123',
};

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <Router>
        <Space>
          <ResetPassword />
        </Space>
      </Router>
    </ThemeProvider>
  );
}

describe('ResetPassword', () => {
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
    it('shows required helper text as a hint when submitting empty value.', async () => {
      const {findAllByTestId, getByTestId} = renderComponent();

      act(() => {
        fireEvent.submit(getByTestId('reset-password-form'));
      });

      const inputErrors = await findAllByTestId('input-error');

      expect(inputErrors[0].textContent).toBe('Field required');
      expect(mockResetPasswordHook).toHaveBeenCalledTimes(0);
      expect(mockGoToLogin).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);
      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);
    });

    it('shows password pattern helper text as a hint when submitting invalid password.', async () => {
      const {findAllByTestId, getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('new-password-input'), {
          target: {value: 'invalidPassword'},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('reset-password-form'));
      });

      const inputErrors = await findAllByTestId('input-error');

      expect(inputErrors[0].textContent).toBe(
        'validationError.invalidPassword'
      );

      expect(getByTestId('password-hints')).toBeInTheDocument();
      expect(mockResetPasswordHook).toHaveBeenCalledTimes(0);
      expect(mockGoToLogin).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);
      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);
    });

    it("shows password does not match helper text as a hint when they don't match.", async () => {
      const {findAllByTestId, getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('new-password-input'), {
          target: {value: MOCK_RESET_PASSWORD.newPassword},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('confirm-password-input'), {
          target: {value: 'notMatchedPassword'},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('reset-password-form'));
      });

      const inputErrors = await findAllByTestId('input-error');

      expect(inputErrors[0].textContent).toBe(
        'validationError.passwordsNotMatch'
      );
      expect(mockResetPasswordHook).toHaveBeenCalledTimes(0);
      expect(mockGoToLogin).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);
      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);
    });

    it('submits valid data and show successful toast message.', async () => {
      const {getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('new-password-input'), {
          target: {value: MOCK_RESET_PASSWORD.newPassword},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('confirm-password-input'), {
          target: {value: MOCK_RESET_PASSWORD.confirmPassword},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('reset-password-form'));
      });

      expect(mockResetPasswordHook).toHaveBeenCalledTimes(1);
      expect(mockResetPasswordHook).toHaveBeenCalledWith(MOCK_RESET_PASSWORD);

      expect(mockGoToLogin).toHaveBeenCalledTimes(1);
      expect(mockGoToLogin).toHaveBeenCalledWith(/* Nothing */);

      expect(mockNotifyError).toHaveBeenCalledTimes(0);

      expect(mockNotifySuccess).toHaveBeenCalledTimes(1);
      expect(mockNotifySuccess).toHaveBeenCalledWith({
        message: 'resetPassword.success.passwordResetSubmitted.title',
        description: 'resetPassword.success.passwordResetSubmitted.message',
      });
    });

    it('triggers toast message when async throw an error', async () => {
      mockResetPasswordHook.mockRejectedValueOnce(new Error('async error'));

      const {getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.change(getByTestId('new-password-input'), {
          target: {value: MOCK_RESET_PASSWORD.newPassword},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('confirm-password-input'), {
          target: {value: MOCK_RESET_PASSWORD.confirmPassword},
        });
        await waitFor(() => {});

        fireEvent.submit(getByTestId('reset-password-form'));
      });

      expect(mockResetPasswordHook).toHaveBeenCalledTimes(1);
      expect(mockResetPasswordHook).toHaveBeenCalledWith(MOCK_RESET_PASSWORD);

      expect(mockGoToLogin).toHaveBeenCalledTimes(0);

      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);

      expect(mockNotifyError).toHaveBeenCalledTimes(1);
      expect(mockNotifyError).toHaveBeenCalledWith({
        message: 'common.error.somethingWentWrong.title',
        description: 'common.error.somethingWentWrong.message',
      });
    });
  });
});
