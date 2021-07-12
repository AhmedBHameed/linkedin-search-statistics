import {useCallback, useState} from 'react';
import {callTryCatch} from '../../../util/callTryCatch';
import useNavigateToLogin from '../../Onboarding/Login/hooks/navigateToLoginHook';
import auth from '../../Onboarding/util/auth';

const useLogout = () => {
  const {goToLogin} = useNavigateToLogin();

  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);

    const [error] = await callTryCatch(async () => auth.logout());

    setLoading(false);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('<LogoutHook />', error);
      return;
    }

    goToLogin();
  }, [goToLogin]);

  return {loading, handleLogout};
};

export default useLogout;
