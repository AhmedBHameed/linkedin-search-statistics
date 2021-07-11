import React from 'react';
import styled from 'styled-components';

// color: ${(props) => props.theme.colors.red};
const List = styled.ul`
  padding: 1.5rem;
  margin: 0;
`;

const Item = styled.li`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.red};
`;

const PasswordHints: React.FC = () => (
  <List data-testid="password-hints">
    <Item>1 character</Item>
    <Item>1 number</Item>
    <Item>with no space</Item>
    <Item>8 characters minimum long</Item>
  </List>
);

export default PasswordHints;
