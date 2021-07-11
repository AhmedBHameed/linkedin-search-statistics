import {useCallback} from 'react';
import {SignupModel} from '../models/SignupModel';

const useSignup = () => {
  const handleSignup = useCallback(async (signupData: SignupModel) => {
    // eslint-disable-next-line no-console
    console.log(signupData);
    // TODO: Write your signup call here.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  }, []);

  return {handleSignup};
};

export default useSignup;
