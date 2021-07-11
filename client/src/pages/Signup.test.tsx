import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';

import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import medicalSpecialityLocale from '../components/shared/hooks/medicalSpecialityLocale.json';
import {mockConsoleErrorFun, mockMediaQuery} from '../setupTests';
import {md} from '../styles/mediaQueries';
import {lightTheme} from '../styles/Theme';
import {mockSignupData} from '../test/utils/generate';
import Signup from './Signup';

mockConsoleErrorFun();

const MOCK_SIGNUP_DATA = mockSignupData({
  country: 'AF', // We are going to mock the first select option which is always `AF` country alpha 2 code.
  medicalSpeciality: medicalSpecialityLocale.en[0],
});

const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();
jest.mock('../components/ToastMessage/hooks/toastMessageHook', () => () => ({
  notifyError: mockNotifyError,
  notifySuccess: mockNotifySuccess,
}));

const mockGoToLogin = jest.fn();
jest.mock('../components/Login/hooks/navigateToLoginHook', () => () => ({
  goToLogin: mockGoToLogin,
}));

const mockSignupHook = jest.fn();
jest.mock('../components/Signup/hooks/signupHook', () => () => ({
  handleSignup: mockSignupHook,
}));

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <Router>
        <Signup />
      </Router>
    </ThemeProvider>
  );
}

describe('Signup', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });

  describe('Form validation', () => {
    it('shows helper text and read boarder for checkboxes as a hint when submitting invalid data.', async () => {
      const {findAllByTestId, getByTestId} = renderComponent();

      act(() => {
        fireEvent.submit(getByTestId('signup-form'));
      });

      const inputErrors = await findAllByTestId('input-error');

      const termsAndConditionsCheckbox = getByTestId(
        'terms-and-conditions-checkbox'
      );
      const licensedDoctorCheckbox = getByTestId('licensed-doctor-checkbox');

      /**
       * Staring our expectation here
       */
      inputErrors.forEach(({textContent}) => {
        expect(textContent).toBe('validationError.required');
      });

      expect(licensedDoctorCheckbox.nextElementSibling).toHaveStyle(
        `border-color: red;`
      );
      expect(termsAndConditionsCheckbox.nextElementSibling).toHaveStyle(
        `border-color: red;`
      );

      expect(getByTestId('password-hints')).toBeInTheDocument();
      expect(mockSignupHook).toHaveBeenCalledTimes(0);
      expect(mockGoToLogin).toHaveBeenCalledTimes(0);
      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(0);
    });

    it('submits valid data and redirect to login.', async () => {
      const {getByTestId, getAllByRole} = renderComponent();

      const countrySelectBox = getByTestId(
        'country-select-field'
      ).querySelector('.ant-select-selector');

      await act(async () => {
        fireEvent.change(getByTestId('title-input'), {
          target: {value: MOCK_SIGNUP_DATA.title},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('first-name-input'), {
          target: {value: MOCK_SIGNUP_DATA.firstName},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('last-name-input'), {
          target: {value: MOCK_SIGNUP_DATA.lastName},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('email-input'), {
          target: {value: MOCK_SIGNUP_DATA.email},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('phone-input'), {
          target: {value: MOCK_SIGNUP_DATA.phone},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('password-input'), {
          target: {value: MOCK_SIGNUP_DATA.password},
        });
        await waitFor(() => {});

        /**
         * medicalSpecialitySelectBox
         */
        fireEvent.mouseDown(getAllByRole('combobox')[0]);
        const medicalSpecialitySelectOptions = await screen.findAllByTestId(
          'medical-speciality-select-option'
        );
        await waitFor(() => medicalSpecialitySelectOptions[0]);
        fireEvent.click(medicalSpecialitySelectOptions[0]);
        await waitFor(() => {});

        fireEvent.change(getByTestId('practice-place-input'), {
          target: {value: MOCK_SIGNUP_DATA.practicePlace},
        });
        await waitFor(() => {});

        /**
         * countrySelectBox
         */
        fireEvent.mouseDown(countrySelectBox as HTMLInputElement);
        await waitFor(() => {});
        fireEvent.click(screen.getAllByTestId('country-option')[0]);
        await waitFor(() => {});

        fireEvent.click(getByTestId('terms-and-conditions-checkbox'));
        await waitFor(() => {});

        fireEvent.click(getByTestId('licensed-doctor-checkbox'));
        await waitFor(() => {});

        fireEvent.submit(getByTestId('signup-form'));
        await waitFor(() => {});

        jest.advanceTimersByTime(3000);
      });

      expect(mockSignupHook).toHaveBeenCalledTimes(1);
      expect(mockSignupHook).toHaveBeenCalledWith(MOCK_SIGNUP_DATA);

      expect(mockGoToLogin).toHaveBeenCalledTimes(1);
      expect(mockGoToLogin).toHaveBeenCalledWith(/* Nothing */);

      expect(mockNotifySuccess).toHaveBeenCalledTimes(1);
      expect(mockNotifySuccess).toHaveBeenCalledWith({
        message: 'signup.success.registrationComplete.title',
        description: 'signup.success.registrationComplete.message',
      });

      expect(mockNotifyError).toHaveBeenCalledTimes(0);
    });

    it('triggers toast message when async throw an error', async () => {
      mockSignupHook.mockRejectedValueOnce(new Error('async error'));
      const {getByTestId, getAllByRole} = renderComponent();

      const countrySelectBox = getByTestId(
        'country-select-field'
      ).querySelector('.ant-select-selector');

      await act(async () => {
        fireEvent.change(getByTestId('title-input'), {
          target: {value: MOCK_SIGNUP_DATA.title},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('first-name-input'), {
          target: {value: MOCK_SIGNUP_DATA.firstName},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('last-name-input'), {
          target: {value: MOCK_SIGNUP_DATA.lastName},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('email-input'), {
          target: {value: MOCK_SIGNUP_DATA.email},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('phone-input'), {
          target: {value: MOCK_SIGNUP_DATA.phone},
        });
        await waitFor(() => {});

        fireEvent.change(getByTestId('password-input'), {
          target: {value: MOCK_SIGNUP_DATA.password},
        });
        await waitFor(() => {});

        /**
         * medicalSpecialitySelectBox
         */
        fireEvent.mouseDown(getAllByRole('combobox')[0]);
        const medicalSpecialitySelectOptions = await screen.findAllByTestId(
          'medical-speciality-select-option'
        );
        await waitFor(() => medicalSpecialitySelectOptions[0]);
        fireEvent.click(medicalSpecialitySelectOptions[0]);
        await waitFor(() => {});

        fireEvent.change(getByTestId('practice-place-input'), {
          target: {value: MOCK_SIGNUP_DATA.practicePlace},
        });
        await waitFor(() => {});

        /**
         * countrySelectBox
         */
        fireEvent.mouseDown(countrySelectBox as HTMLInputElement);
        await waitFor(() => {});
        fireEvent.click(screen.getAllByTestId('country-option')[0]);
        await waitFor(() => {});

        fireEvent.click(getByTestId('terms-and-conditions-checkbox'));
        await waitFor(() => {});

        fireEvent.click(getByTestId('licensed-doctor-checkbox'));
        await waitFor(() => {});

        fireEvent.submit(getByTestId('signup-form'));
        await waitFor(() => {});

        jest.advanceTimersByTime(3000);
      });

      expect(mockSignupHook).toHaveBeenCalledTimes(1);
      expect(mockSignupHook).toHaveBeenCalledWith(MOCK_SIGNUP_DATA);

      expect(mockGoToLogin).toHaveBeenCalledTimes(0);

      expect(mockNotifySuccess).toHaveBeenCalledTimes(0);
      expect(mockNotifyError).toHaveBeenCalledTimes(1);
      // TODO: Adapt if error mapping exist.
      expect(mockNotifyError).toHaveBeenCalledWith({
        message: 'signup.error.accountAlreadyExist.title',
        description: 'signup.error.accountAlreadyExist.message',
      });
    });
  });
});
