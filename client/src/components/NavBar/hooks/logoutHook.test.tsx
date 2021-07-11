import {act, waitFor} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {mockConsoleErrorFun} from '../../../setupTests';
import {rest, server} from '../../../test/testServer';
import useLogout from './logoutHook';

const mockGoToLogout = jest.fn(() => Promise.resolve(true));
jest.mock('../../Login/hooks/navigateToLoginHook', () => () => ({
  goToLogin: mockGoToLogout,
}));

const mockConsoleError = mockConsoleErrorFun();

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

const mockOnComplete = jest.fn();
const mockOnError = jest.fn();

describe('LogoutHook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs out and clear the cache', async () => {
    makeSuccessfulCall();

    const {result} = renderHook(() =>
      useLogout({
        onComplete: mockOnComplete,
        onError: mockOnError,
      })
    );

    await act(async () => {
      result.current.handleLogout();
      await waitFor(() => {});

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(mockConsoleError).toHaveBeenCalledTimes(0);
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledTimes(0);
      expect(mockGoToLogout).toHaveBeenCalledTimes(1);
      expect(mockGoToLogout).toHaveBeenCalledWith(/* nothing */);
    });
  });

  it('calls onError function when async fail', async () => {
    makeErrorCall();

    const {result} = renderHook(() =>
      useLogout({
        onComplete: mockOnComplete,
        onError: mockOnError,
      })
    );

    await act(async () => {
      result.current.handleLogout();
      await waitFor(() => {});

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockOnComplete).toHaveBeenCalledTimes(0);
      expect(mockOnError).toHaveBeenCalledTimes(1);
      expect(mockGoToLogout).toHaveBeenCalledTimes(0);
    });
  });
});
