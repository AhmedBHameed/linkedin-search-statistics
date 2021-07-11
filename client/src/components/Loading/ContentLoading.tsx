import {Spin} from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px 50px;
  margin: 20px 0;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 4px;
`;

const ContentLoading: React.FC = () => (
  <Container data-testid="loading-content">
    <Spin size="large" />
  </Container>
);

export default ContentLoading;
