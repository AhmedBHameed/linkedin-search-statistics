import {KeyOutlined, LoginOutlined, UserOutlined} from '@ant-design/icons';
import {joiResolver} from '@hookform/resolvers/joi';
import {Card, Col, Row} from 'antd';

import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {FormControl, InputField, PasswordField} from '../components/Forms/Form';
import useNavigateToLogin from '../components/Onboarding/Login/hooks/navigateToLoginHook';
import PasswordHints from '../components/Onboarding/PasswordHints';
import {SignupModel} from '../components/Onboarding/Signup/models/SignupModel';
import signupSchema from '../components/Onboarding/Signup/signupSchema';
import auth from '../components/Onboarding/util/auth';
import {
  FormTitle,
  FullWidthLoadingButton,
  OnboardingForm,
  StyledBrand,
  StyledRow,
} from '../components/shared/onboardingStyles';
import useToastMessage from '../components/ToastMessage/hooks/toastMessageHook';
import NAVIGATION_ROUTES from '../config/NavigationRoutes';
import {callTryCatch} from '../util/callTryCatch';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {goToLogin} = useNavigateToLogin();
  const {notifyError, notifySuccess} = useToastMessage();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<SignupModel>({
    resolver: joiResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const signup = useCallback(
    async (formData: SignupModel) => {
      setLoading(true);
      const [error] = await callTryCatch(async () =>
        auth.signup({
          password: formData.password,
          email: formData.email,
          name: {
            first: formData.firstName,
            last: formData.lastName,
          },
        })
      );

      setLoading(false);

      if (error) {
        // eslint-disable-next-line no-console
        console.error('<Signup />', error);
        notifyError({
          message: 'Signup failed',
          description: 'Oops! Something went wrong while signing up',
        });

        return;
      }

      notifySuccess({
        message: 'Signup success',
        description:
          'Great! You will receive an email, follow instruction to verify your account',
      });
      goToLogin();
    },
    [notifyError, setLoading, notifySuccess, goToLogin]
  );

  const firstNameError = errors.firstName?.message;
  const lastNameError = errors.lastName?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <StyledRow align="middle" justify="center">
      <Col lg={6} md={10} sm={12} xs={24}>
        <OnboardingForm onSubmit={handleSubmit(signup)} testId="login-form">
          <Card>
            <Row align="middle" justify="center">
              <StyledBrand />
            </Row>

            <Row>
              <Col xs={24}>
                <FormTitle level={5}>Login</FormTitle>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <FormControl error={firstNameError} label="First name">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({field: {value, onChange}}) => (
                      <InputField
                        ariaLabel="first name"
                        error={!!firstNameError}
                        name="firstName"
                        onChange={onChange}
                        placeholder="First name"
                        prefixIcon={<UserOutlined />}
                        size="large"
                        testId="first-name-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Col>

              <Col xs={24}>
                <FormControl error={lastNameError} label="Last name">
                  <Controller
                    control={control}
                    name="lastName"
                    render={({field: {value, onChange}}) => (
                      <InputField
                        ariaLabel="last name"
                        error={!!lastNameError}
                        name="lastName"
                        onChange={onChange}
                        placeholder="Last name"
                        prefixIcon={<UserOutlined />}
                        size="large"
                        testId="last-name-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Col>

              <Col xs={24}>
                <FormControl error={emailError} label="Email">
                  <Controller
                    control={control}
                    name="email"
                    render={({field: {value, onChange}}) => (
                      <InputField
                        ariaLabel="email"
                        error={!!emailError}
                        name="email"
                        onChange={onChange}
                        placeholder="Email"
                        prefixIcon={<UserOutlined />}
                        size="large"
                        testId="email-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Col>

              <Col xs={24}>
                <FormControl error={passwordError} label="Password">
                  <Controller
                    control={control}
                    name="password"
                    render={({field: {value, onChange}}) => (
                      <PasswordField
                        ariaLabel="password"
                        error={!!passwordError}
                        name="password"
                        onChange={onChange}
                        placeholder="Password"
                        prefixIcon={<KeyOutlined />}
                        size="large"
                        testId="password-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>

                <Col xs={24}>
                  {errors.password?.message && <PasswordHints />}
                </Col>
              </Col>
            </Row>

            <Row justify="end">
              <Link to={NAVIGATION_ROUTES.forgotPassword.path}>
                Forgot password?
              </Link>
            </Row>

            <Row>
              <FullWidthLoadingButton
                disabled={loading}
                htmlType="submit"
                icon={<LoginOutlined />}
                loading={loading}
                size="large"
                testId="login-action-button"
              >
                Login
              </FullWidthLoadingButton>
            </Row>

            <Row align="middle" justify="center">
              <Link to={NAVIGATION_ROUTES.login.path}>Have an account?</Link>
            </Row>
          </Card>
        </OnboardingForm>
      </Col>
    </StyledRow>
  );
};

export default Signup;
