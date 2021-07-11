/**
 * Why this is another test for ForgotPassword
 * @see https://stackoverflow.com/questions/56496998/how-to-restore-a-mock-created-with-jest-mock
 */
import {act, fireEvent, render, waitFor} from '@testing-library/react';

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
import {rest, server} from '../test/testServer';
import Dashboard from './Dashboard';

const mockConsoleError = mockConsoleErrorFun();

jest.mock('../components/Dashboard/NotificationList', () => () => <></>);

const makeSuccessfulCall = () => {
  server.use(
    rest.get(`*/todos/1`, async (_, res, ctx) =>
      res(ctx.delay(50), ctx.status(200), ctx.json({result: 'Mocked result'}))
    )
  );
};

const makeErrorCall = () => {
  server.use(
    rest.get(`*/todos/1`, async (_, res, ctx) =>
      res(ctx.delay(50), ctx.status(500), ctx.json({error: 'async error'}))
    )
  );
};

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <Router>
        <Dashboard />
      </Router>
    </ThemeProvider>
  );
}

describe('Dashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Button functionality', () => {
    it(`redirects to "${NAVIGATION_ROUTES.orderAnalysis.path}" when order analysis button clicked`, async () => {
      makeSuccessfulCall();

      const {getByTestId} = renderComponent();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await act(async () => {
        fireEvent.click(getByTestId('navigate-to-order-analysis-button'));
        await waitFor(() => {});
      });

      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith(
        NAVIGATION_ROUTES.orderAnalysis.path
      );
    });

    it(`redirects to "${NAVIGATION_ROUTES.patients.path}" when read latest reports button clicked`, async () => {
      makeSuccessfulCall();

      const {getByTestId} = renderComponent();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await act(async () => {
        fireEvent.click(getByTestId('read-latest-reports-button'));
        await waitFor(() => {});
      });

      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith(
        NAVIGATION_ROUTES.patients.path
      );
    });
  });

  it(`shows errors layout when fetch fails`, async () => {
    makeErrorCall();

    const {getByTestId} = renderComponent();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await act(async () => {
      expect(getByTestId('refetch-button')).toBeInTheDocument();
      expect(mockHistoryPush).toHaveBeenCalledTimes(0);
    });
  });
});
