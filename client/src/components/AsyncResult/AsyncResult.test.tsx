import {render} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';

import {lightTheme} from '../../styles/Theme';
import AsyncResult from './AsyncResult';

const mockActionButton = jest.fn();
function renderComponent() {
  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <AsyncResult onActionButtonClick={mockActionButton} status={500} />
    </ThemeProvider>
  );
}

describe('AsyncResult', () => {
  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
