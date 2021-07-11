import {act, fireEvent, render} from '@testing-library/react';

import {axe} from 'jest-axe';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {mockConsoleErrorFun, mockMediaQuery} from '../setupTests';
import {md} from '../styles/mediaQueries';
import {lightTheme} from '../styles/Theme';
import {rest, server} from '../test/testServer';
import {mockLoginData} from '../test/utils/generate';
import Login from './Login';

mockConsoleErrorFun();

const MOCK_LOGIN_DATA = mockLoginData({password: 'Test@123456789'});

const mockGoToDashboard = jest.fn();
jest.mock(
  '../components/Dashboard/hooks/navigateToDashboardHook',
  () => () => ({
    goToDashboard: mockGoToDashboard,
  })
);

const mockNotifyError = jest.fn();
jest.mock('../components/ToastMessage/hooks/toastMessageHook', () => () => ({
  notifyError: mockNotifyError,
}));

const makeSuccessfulCall = () => {
  server.use(
    rest.post(`*/posts`, (_, res, ctx) =>
      res(ctx.delay(500), ctx.status(200), ctx.json({result: 'Mocked result'}))
    )
  );
};

const makeErrorCall = () => {
  server.use(
    rest.post(`*/posts`, (_, res, ctx) =>
      res(ctx.status(500), ctx.json({error: 'async error'}))
    )
  );
};

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <Router>
        <Login />
      </Router>
    </ThemeProvider>
  );
}

describe('Login', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });

  describe('Form validation', () => {
    it('shows helper text as a hint when submitting invalid data.', async () => {
      const {findAllByTestId, getByTestId} = renderComponent();

      act(() => {
        fireEvent.submit(getByTestId('login-form'));
      });

      const inputErrors = await findAllByTestId('input-error');

      /**
       * The idea here is to match localization key of the error.
       */
      expect(inputErrors[0].textContent).toBe('validationError.required');
      expect(inputErrors[1].textContent).toBe('validationError.required');
      expect(mockGoToDashboard).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);
    });

    it('submits valid data and redirect to dashboard.', async () => {
      makeSuccessfulCall();

      const {getByTestId} = renderComponent();

      /**
       * In case you wonder why we should use async act @see https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
       * Regarding line await waitFor(() => {})
       * It is a simulation for user behaviour (The test will fail without it).
       */
      fireEvent.change(getByTestId('email-input'), {
        target: {value: MOCK_LOGIN_DATA.email},
      });
      fireEvent.change(getByTestId('password-input'), {
        target: {value: MOCK_LOGIN_DATA.password},
      });
      fireEvent.submit(getByTestId('login-form'));

      /**
       * There is something wrong with react-testing-library
       * It is explained here @see https://github.com/testing-library/react-testing-library/issues/865
       * We are going to make a workaround till we find another better solution.
       */
      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(mockGoToDashboard).toHaveBeenCalledTimes(1);
      expect(mockGoToDashboard).toHaveBeenCalledWith(/* Nothing */);
    });

    it('triggers toast message when async throw an error', async () => {
      makeErrorCall();

      const {getByTestId} = renderComponent();

      /**
       * In case you wonder why we should use async act @see https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
       * Regarding line await waitFor(() => {})
       * It is a simulation for user behaviour (The test will fail without it).
       */
      fireEvent.change(getByTestId('email-input'), {
        target: {value: MOCK_LOGIN_DATA.email},
      });
      fireEvent.change(getByTestId('password-input'), {
        target: {value: MOCK_LOGIN_DATA.password},
      });
      fireEvent.click(getByTestId('login-action-button'));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(mockGoToDashboard).toHaveBeenCalledTimes(0);

      expect(mockNotifyError).toHaveBeenCalledTimes(1);
      expect(mockNotifyError).toHaveBeenCalledWith({
        message: 'login.error.invalidEmailOrPassword.title',
        description: 'login.error.invalidEmailOrPassword.message',
      });
    });
  });

  it('accessability check', async () => {
    makeSuccessfulCall();

    const {container} = renderComponent();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
