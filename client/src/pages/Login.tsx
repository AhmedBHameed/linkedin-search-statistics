import {KeyOutlined, LoginOutlined, UserOutlined} from '@ant-design/icons';
import {joiResolver} from '@hookform/resolvers/joi';
import {Card, Col, Row, Typography} from 'antd';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import useNavigateToDashboard from '../components/Dashboard/hooks/navigateToDashboardHook';
import {FormControl, InputField, PasswordField} from '../components/Forms/Form';
import loginSchema from '../components/Onboarding/Login/loginSchema';
import {LoginInput} from '../components/Onboarding/Login/models/LoginInput';
import PasswordHints from '../components/Onboarding/PasswordHints';
import auth from '../components/Onboarding/util/auth';
import {
  FullWidthLoadingButton,
  OnboardingForm,
  StyledBrand,
  StyledRow,
} from '../components/shared/onboardingStyles';
import {mediumGathomFontStyle} from '../components/shared/sharedStyles';
import useToastMessage from '../components/ToastMessage/hooks/toastMessageHook';
import NAVIGATION_ROUTES from '../config/NavigationRoutes';
import {callTryCatch} from '../util/callTryCatch';

const LoginTitle = styled(Typography.Title)`
  ${mediumGathomFontStyle}
  margin: 2rem 0;
  margin-bottom: 2rem !important;
`;

const Login: React.FC = () => {
  const {goToDashboard} = useNavigateToDashboard();
  const {notifyError} = useToastMessage();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (formData: LoginInput) => {
      setLoading(true);
      const [error] = await callTryCatch(async () =>
        auth.login({
          password: formData.password,
          username: formData.email,
        })
      );

      setLoading(false);

      if (error) {
        // eslint-disable-next-line no-console
        console.error('<Login />', error);
        notifyError({
          message: 'Login failed',
          description: 'Invalid username or password. Please try again later',
        });

        return;
      }

      goToDashboard();
    },
    [goToDashboard, setLoading, notifyError]
  );

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <StyledRow align="middle" justify="center">
      <Col lg={6} md={10} sm={12} xs={24}>
        <OnboardingForm onSubmit={handleSubmit(login)} testId="login-form">
          <Card>
            <Row align="middle" justify="center">
              <StyledBrand />
            </Row>

            <Row>
              <Col xs={24}>
                <LoginTitle level={5}>Login</LoginTitle>
              </Col>
            </Row>

            <Row>
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
              <Link to={NAVIGATION_ROUTES.signup.path}>
                Register new account.
              </Link>
            </Row>
          </Card>
        </OnboardingForm>
      </Col>
    </StyledRow>
  );
};

export default Login;
