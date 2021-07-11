import {notification} from 'antd';
import {ArgsProps} from 'antd/lib/notification';
import {useCallback} from 'react';

const placement = 'bottomLeft';

const useToastMessage = () => {
  const notifyError = useCallback((config: ArgsProps) => {
    notification.error({
      ...config,
      placement,
    });
  }, []);

  const notifySuccess = useCallback((config: ArgsProps) => {
    notification.success({
      ...config,
      placement,
    });
  }, []);

  const closeNotification = useCallback((key: string) => {
    notification.close(key);
  }, []);

  return {notifyError, notifySuccess, closeNotification};
};

export default useToastMessage;
