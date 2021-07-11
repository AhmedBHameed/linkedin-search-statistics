import {render} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';
import {mockMediaQuery} from '../../setupTests';
import {md} from '../../styles/mediaQueries';
import {lightTheme} from '../../styles/Theme';
import PasswordHints from './PasswordHints';

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <PasswordHints />
    </ThemeProvider>
  );
}

describe('PasswordHints', () => {
  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
