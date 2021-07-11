import {Spin} from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const OverlayLoading: React.FC = () => (
  <Container data-testid="loading-overlay">
    <Spin size="large" />
  </Container>
);

export default OverlayLoading;
