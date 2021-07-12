import {Col, Row} from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  padding: 4rem 1rem;
`;

interface OrderContainerProps {
  headTitle?: React.ReactNode;
  colXs?: number;
  colMd?: number;
  colLg?: number;
}

const PagesContainer: React.FC<OrderContainerProps> = ({
  children,
  headTitle,
  colXs,
  colMd,
  colLg,
}) => (
  <StyledRow align="top" gutter={[0, 16]} justify="center">
    <Col lg={colLg || 16} md={colMd || 22} xs={colXs || 23}>
      {headTitle && headTitle}

      {children}
    </Col>
  </StyledRow>
);

export default PagesContainer;
