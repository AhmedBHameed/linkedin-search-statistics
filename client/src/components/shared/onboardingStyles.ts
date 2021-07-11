/**
 * Styles shared for login, signup, reset password, forgot password screens.
 */

import {Row, Typography} from 'antd';
import styled from 'styled-components';
import devices from '../../styles/mediaQueries';
import Brand from '../Brand/Brand';
import LoadingButton from '../Buttons/LoadingButton';
import {Form} from '../Forms/Form';
import {mediumGathomFontStyle} from './sharedStyles';

const StyledRow = styled(Row)`
  min-height: 100%;
  @media ${devices.mdMediaQuery} {
    background-color: transparent;
  }
`;

const OnboardingForm = styled(Form)`
  border-radius: 1rem;
`;

const FormTitle = styled(Typography.Title)`
  ${mediumGathomFontStyle}

  margin: 2rem 0;
  margin-bottom: 2rem !important;
`;

const FullWidthLoadingButton = styled(LoadingButton)`
  width: 100%;
  margin: 2rem 0;
`;

const StyledBrand = styled(Brand)`
  width: 20rem;
`;

export {
  StyledRow,
  OnboardingForm,
  StyledBrand,
  FormTitle,
  FullWidthLoadingButton,
};
