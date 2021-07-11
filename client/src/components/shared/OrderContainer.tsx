import {Col, Row} from 'antd';
import React from 'react';
import styled from 'styled-components';
import devices from '../../styles/mediaQueries';
import Title from './Title';

const StyledRow = styled(Row)`
  padding: 4rem 1rem;
  @media ${devices.mdMediaQuery} {
    padding: 4rem;
  }
`;

interface OrderContainerProps {
  title?: string;
}

const OrderContainer: React.FC<OrderContainerProps> = ({children, title}) => (
  <StyledRow align="middle" justify="center">
    <Col lg={18} md={22} xs={24}>
      {title && <Title level={4}>{title}</Title>}

      {children}
    </Col>
  </StyledRow>
);

export default OrderContainer;
