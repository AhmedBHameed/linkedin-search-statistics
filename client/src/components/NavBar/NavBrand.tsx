import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import NAVIGATION_ROUTES from '../../config/NavigationRoutes';
import Brand from '../Brand/Brand';

const BrandContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

const NavBrand: React.FC = () => (
  <BrandContainer>
    <Link to={NAVIGATION_ROUTES.statistics.path}>
      <Brand />
    </Link>
  </BrandContainer>
);

export default NavBrand;
