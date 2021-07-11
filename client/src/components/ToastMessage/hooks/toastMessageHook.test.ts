import {act} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {notification} from 'antd';
import {mockToastMessageData} from '../../../test/utils/generate';
import useToastMessage from './toastMessageHook';

jest.mock('antd', () => ({
  ...(jest.requireActual('antd') as any),
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const MOCK_TOAST_MESSAGE = mockToastMessageData();

describe('ToastMessageHook', () => {
  it('triggers successful toast message', async () => {
    const {result} = renderHook(useToastMessage);

    act(() => {
      result.current.notifySuccess({
        message: MOCK_TOAST_MESSAGE.message,
        description: MOCK_TOAST_MESSAGE.description,
      });
    });

    expect(notification.success).toHaveBeenCalledTimes(1);
    expect(notification.success).toHaveBeenCalledWith(MOCK_TOAST_MESSAGE);
  });

  it('triggers error toast message', async () => {
    const {result} = renderHook(useToastMessage);

    await act(async () => {
      await result.current.notifyError({
        message: MOCK_TOAST_MESSAGE.message,
        description: MOCK_TOAST_MESSAGE.description,
      });
    });

    expect(notification.error).toHaveBeenCalledTimes(1);
    expect(notification.error).toHaveBeenCalledWith(MOCK_TOAST_MESSAGE);
  });
});
