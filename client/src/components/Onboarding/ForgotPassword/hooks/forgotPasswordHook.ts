import {useCallback} from 'react';
import {ForgotPasswordModel} from '../models/ForgotPasswordModel';

const useForgotPassword = () => {
  const handleForgotPassword = useCallback(
    async (forgotPasswordData: ForgotPasswordModel) => {
      // eslint-disable-next-line no-console
      console.log('<ForgotPasswordHook>', forgotPasswordData);
      // TODO: Write your login call here.
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    },
    []
  );

  return {handleForgotPassword};
};

export default useForgotPassword;
