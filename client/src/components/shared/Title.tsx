import {Typography} from 'antd';
import styled from 'styled-components';
import {mediumGathomFontStyle} from './sharedStyles';

const Title = styled(Typography.Title)`
  ${mediumGathomFontStyle}
  margin: 2rem 0;
  margin-bottom: 2rem !important;
`;

export default Title;
