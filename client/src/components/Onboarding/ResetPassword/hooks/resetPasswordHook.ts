import {useCallback} from 'react';
import {ResetPasswordModel} from '../models/ResetPasswordModel';

const useResetPassword = () => {
  const handleResetPassword = useCallback(
    async (resetPasswordData: ResetPasswordModel) => {
      // eslint-disable-next-line no-console
      console.log('<ResetPasswordHook>', resetPasswordData);
      // TODO: Write your login call here.
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    },
    []
  );

  return {handleResetPassword};
};

export default useResetPassword;
