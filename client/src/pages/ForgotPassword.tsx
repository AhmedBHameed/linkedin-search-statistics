import {MailOutlined} from '@ant-design/icons';
import {joiResolver} from '@hookform/resolvers/joi';
import {Card, Col, Row} from 'antd';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import LoadingButton from '../components/Buttons/LoadingButton';

import {FormControl, InputField} from '../components/Forms/Form';
import forgotPasswordSchema from '../components/Onboarding/ForgotPassword/forgotPasswordSchema';
import {ForgotPasswordModel} from '../components/Onboarding/ForgotPassword/models/ForgotPasswordModel';
import auth from '../components/Onboarding/util/auth';
import {
  FormTitle,
  OnboardingForm,
  StyledBrand,
  StyledRow,
} from '../components/shared/onboardingStyles';
import useToastMessage from '../components/ToastMessage/hooks/toastMessageHook';
import NAVIGATION_ROUTES from '../config/NavigationRoutes';
import {callTryCatch} from '../util/callTryCatch';

// const RedirectToSignupButton = styled(Button)`
//   padding: 0;
// `;

const FullWidthLoadingButton = styled(LoadingButton)`
  width: 100%;
  margin: 2rem 0;
`;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {notifyError, notifySuccess} = useToastMessage();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ForgotPasswordModel>({
    resolver: joiResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const forgotPassword = useCallback(
    async (formData: ForgotPasswordModel) => {
      setLoading(true);
      const [error] = await callTryCatch(async () =>
        auth.forgotPassword({
          email: formData.email,
        })
      );

      setLoading(false);

      if (error) {
        // eslint-disable-next-line no-console
        console.error('<Signup />', error);
        notifyError({
          message: 'Forgot password',
          description: 'Email not found in our database',
        });

        return;
      }

      notifySuccess({
        message: 'Forgot password',
        description: 'We will help you retrieve you password.',
      });
    },
    [notifyError, notifySuccess]
  );

  const emailError = errors.email?.message;

  return (
    <StyledRow align="middle" justify="center">
      <Col lg={8} md={10} sm={12} xs={24}>
        <OnboardingForm
          onSubmit={handleSubmit(forgotPassword)}
          testId="forgot-password-form"
        >
          <Card>
            <Row align="middle" justify="center">
              <StyledBrand />
            </Row>

            <Row>
              <Col xs={24}>
                <FormTitle level={5}>Forgot password</FormTitle>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <FormControl error={emailError} label="Email">
                  <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value}}) => (
                      <InputField
                        ariaLabel="email"
                        error={!!emailError}
                        name="email"
                        onChange={onChange}
                        placeholder="Email"
                        prefixIcon={<MailOutlined />}
                        size="large"
                        testId="email-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>

            <Row justify="end">
              <Link to={NAVIGATION_ROUTES.login.path}>
                Return back to login.
              </Link>
            </Row>

            <Row>
              <FullWidthLoadingButton
                disabled={loading}
                htmlType="submit"
                icon={<MailOutlined />}
                loading={loading}
                size="large"
                testId="forgot-password-submit-button"
              >
                Submit
              </FullWidthLoadingButton>
            </Row>

            <Row align="middle" justify="center">
              <Link to={NAVIGATION_ROUTES.signup.path}>
                Don&apos;t have account? register here.
              </Link>
            </Row>
          </Card>
        </OnboardingForm>
      </Col>
    </StyledRow>
  );
};

export default ForgotPassword;
