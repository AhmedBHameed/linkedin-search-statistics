import styled from 'styled-components';
import devices from '../../styles/mediaQueries';
import {mediumGathomFontStyle} from '../shared/sharedStyles';
import BaseButton from './BaseButton';

const FillWidthBaseButton = styled(BaseButton).withConfig({
  shouldForwardProp: (prop) => !['withTopSpace'].includes(prop),
})<{withTopSpace?: boolean}>((props) => {
  const {withTopSpace} = props;

  return `
  width: 100%;
  ${mediumGathomFontStyle}
  ${withTopSpace ? 'margin-top: 0.5rem;' : ''}
  @media ${devices.mdMediaQuery} {
    width: auto;
    margin-top: 0;
  }`;
});

export default FillWidthBaseButton;
