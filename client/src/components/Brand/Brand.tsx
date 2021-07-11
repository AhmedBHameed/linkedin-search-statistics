import React from 'react';
import styled from 'styled-components';
import {ReactComponent as JobScrapSvg} from '../../statics/logo.svg';

const BiomaDarkBrandIcon = styled(JobScrapSvg)`
  width: 15rem;
`;

interface BrandProps {
  className?: string;
}

const Brand: React.FC<BrandProps> = ({className}) => (
  <BiomaDarkBrandIcon className={className} />
);

export default Brand;
