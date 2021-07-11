import {render} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';
import {mockMediaQuery} from '../../setupTests';
import {md} from '../../styles/mediaQueries';
import {lightTheme} from '../../styles/Theme';
import OverlayLoading from './OverlayLoading';

function renderComponent() {
  mockMediaQuery(md, md);

  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <OverlayLoading />
    </ThemeProvider>
  );
}

describe('Loading', () => {
  it('matches snapshot', async () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
