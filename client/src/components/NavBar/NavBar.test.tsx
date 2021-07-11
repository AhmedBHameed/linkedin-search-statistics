import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {mockLocationPathname, mockMediaQuery} from '../../setupTests';
import {md, sm} from '../../styles/mediaQueries';

import {lightTheme} from '../../styles/Theme';
import ViewportProvider from '../WindowViewport/ViewportProvider';
import NavBar from './NavBar';

function renderComponent() {
  return render(
    <Router>
      <ViewportProvider>
        <ThemeProvider theme={{colors: lightTheme}}>
          <NavBar />
        </ThemeProvider>
      </ViewportProvider>
    </Router>
  );
}

describe('NavBar', () => {
  beforeEach(() => {
    mockLocationPathname.mockImplementation(() => ({
      pathname: '/',
    }));

    jest.clearAllMocks();
  });

  it('matches snapshot', async () => {
    mockMediaQuery(md, md);

    const {container} = renderComponent();

    await waitFor(async () => {
      expect(container).toMatchSnapshot();
    });
  });

  describe('Viewport behaviour', () => {
    it('shows tablet navbar version on screen bigger or equal to tablet size', async () => {
      mockMediaQuery(md, md);

      const {queryByTestId} = renderComponent();

      await waitFor(async () => {
        expect(await queryByTestId('tablet-navbar')).toBeInTheDocument();
        expect(
          await queryByTestId('profile-tablet-submenu')
        ).toBeInTheDocument();
        expect(await queryByTestId('burger-button')).not.toBeInTheDocument();
      });
    });

    it('shows mobile navbar version on screen smaller than tablet size', async () => {
      mockMediaQuery(md, sm);
      const {queryByTestId} = renderComponent();

      await waitFor(async () => {
        expect(await queryByTestId('tablet-navbar')).not.toBeInTheDocument();
        expect(
          await queryByTestId('profile-tablet-submenu')
        ).not.toBeInTheDocument();
        expect(await queryByTestId('burger-button')).toBeInTheDocument();
      });
    });

    it('shows drawer menu on mobile version when burger button clicked', async () => {
      mockMediaQuery(md, sm);

      const {getByTestId} = renderComponent();

      await act(async () => {
        fireEvent.click(getByTestId('burger-button'));
        await waitFor(() => {});
      });

      expect(getByTestId('drawer-navigation')).toBeInTheDocument();
    });
  });
});
