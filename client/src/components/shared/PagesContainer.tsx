import {Col, Row} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Title from './Title';

const StyledRow = styled(Row)`
  padding: 4rem 1rem;
`;

interface OrderContainerProps {
  headTitle?: string;
}

const PagesContainer: React.FC<OrderContainerProps> = ({
  children,
  headTitle,
}) => (
  <StyledRow align="middle" justify="center">
    <Col lg={18} md={22} xs={24}>
      {headTitle && <Title level={4}>{headTitle}</Title>}

      {children}
    </Col>
  </StyledRow>
);

export default PagesContainer;
