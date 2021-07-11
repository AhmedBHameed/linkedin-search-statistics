import {useCallback, useState} from 'react';
import {httpClient} from '../../../../util/httpClient';
import {FetchConfiguration} from '../../../shared/model/fetchConfiguration';
import {LoginInput} from '../models/LoginInput';

type LoginResult = unknown;
const useLogin = (conf: FetchConfiguration<LoginResult>) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (loginData: LoginInput) => {
      setLoading(true);
      try {
        const response = await httpClient.post<any>('/posts', loginData);
        conf.onComplete?.(response.data);
      } catch (catchError) {
        // eslint-disable-next-line no-console
        console.error('<FetchProductPriceHook />', catchError);
        conf?.onError?.(catchError);
      } finally {
        setLoading(false);
      }
    },
    [conf, setLoading]
  );

  return {
    loading,
    handleLogin,
  };
};

export default useLogin;
