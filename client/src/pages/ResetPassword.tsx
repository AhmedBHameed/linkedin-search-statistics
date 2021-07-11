import {KeyOutlined, LoginOutlined} from '@ant-design/icons';
import {joiResolver} from '@hookform/resolvers/joi';
import {Card, Col, Row} from 'antd';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {Link, useParams} from 'react-router-dom';
import {FormControl, PasswordField} from '../components/Forms/Form';
import useNavigateToLogin from '../components/Onboarding/Login/hooks/navigateToLoginHook';
import PasswordHints from '../components/Onboarding/PasswordHints';
import {ResetPasswordModel} from '../components/Onboarding/ResetPassword/models/ResetPasswordModel';
import resetPasswordSchema from '../components/Onboarding/ResetPassword/resetPasswordSchema';
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

type VerificationUserInput = {
  userId: string;
  verificationId: string;
};

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {notifyError, notifySuccess} = useToastMessage();
  const params = useParams<VerificationUserInput>();
  const {goToLogin} = useNavigateToLogin();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ResetPasswordModel>({
    resolver: joiResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const resetPassword = useCallback(
    async (formData: ResetPasswordModel) => {
      setLoading(true);
      const [error] = await callTryCatch(async () =>
        auth.resetPassword({
          newPassword: formData.newPassword,
          userId: params.userId,
          verificationId: params.verificationId,
        })
      );

      setLoading(false);

      if (error) {
        // eslint-disable-next-line no-console
        console.error('<ResetPassword />', error);
        notifyError({
          message: 'Reset password failed',
          description: 'Oops! Something went wrong while resetting password',
        });

        return;
      }

      notifySuccess({
        message: 'Password reset',
        description: 'Great! you password has been reset',
      });
      goToLogin();
    },
    [params, notifyError, notifySuccess, goToLogin]
  );

  const newPasswordError = errors.newPassword?.message;
  const confirmPasswordError = errors.confirmPassword?.message;

  return (
    <StyledRow align="middle" justify="center">
      <Col lg={8} md={10} sm={12} xs={24}>
        <OnboardingForm
          onSubmit={handleSubmit(resetPassword)}
          testId="reset-password-form"
        >
          <Card>
            <Row align="middle" justify="center">
              <StyledBrand />
            </Row>

            <Row>
              <Col xs={24}>
                <FormTitle level={5}>Reset password</FormTitle>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <FormControl error={newPasswordError} label="Reset password">
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({field: {value, onChange}}) => (
                      <PasswordField
                        ariaLabel="new password"
                        error={!!newPasswordError}
                        name="newPassword"
                        onChange={onChange}
                        placeholder="New password"
                        prefixIcon={<KeyOutlined />}
                        size="large"
                        testId="new-password-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <FormControl
                  error={confirmPasswordError}
                  label="Confirm password"
                >
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({field: {value, onChange}}) => (
                      <PasswordField
                        ariaLabel="confirm password"
                        error={!!confirmPasswordError}
                        name="confirmPassword"
                        onChange={onChange}
                        placeholder="Confirm password"
                        prefixIcon={<KeyOutlined />}
                        size="large"
                        testId="confirm-password-input"
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Col>
            </Row>

            <Col xs={24}>
              {errors.newPassword?.message && <PasswordHints />}
            </Col>

            <Row justify="end">
              <Link to={NAVIGATION_ROUTES.login.path}>Return to login</Link>
            </Row>

            <Row>
              <FullWidthLoadingButton
                disabled={loading}
                htmlType="submit"
                icon={<LoginOutlined />}
                loading={loading}
                size="large"
              >
                Reset
              </FullWidthLoadingButton>
            </Row>

            <Row align="middle" justify="center">
              <Link to={NAVIGATION_ROUTES.signup.path}>
                Don&apos;t have account?
              </Link>
            </Row>
          </Card>
        </OnboardingForm>
      </Col>
    </StyledRow>
  );
};

export default ResetPassword;
