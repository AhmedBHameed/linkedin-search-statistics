import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';

import {lightTheme} from '../../styles/Theme';
import LoadingButton from './LoadingButton';

function renderComponent(
  props: {loading?: boolean; onClick?: () => void} = {}
) {
  const {loading, onClick} = props;
  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <LoadingButton
        loading={loading}
        onClick={onClick}
        testId="loading-button"
      />
    </ThemeProvider>
  );
}

describe('LoadingButton', () => {
  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });

  describe('Button functionality', () => {
    it('shows loading icon when loading property is true', async () => {
      const {container} = renderComponent({loading: true});

      /**
       * SVGs do not render instantly @see https://www.samdawson.dev/article/svg-graph-testing
       */
      await waitFor(() => {
        expect(container.querySelector('svg')).toHaveAttribute(
          'data-icon',
          'loading'
        );
      });
    });

    it('hides loading icon when loading property is false', async () => {
      const {container} = renderComponent({loading: false});

      await waitFor(() => {
        expect(container.querySelector('svg')).not.toBeInTheDocument();
      });
    });

    it('executes onClick function when clicked', () => {
      const mockButtonOnClick = jest.fn();

      const {getByTestId} = renderComponent({onClick: mockButtonOnClick});

      act(() => {
        fireEvent.click(getByTestId('loading-button'));
      });

      expect(mockButtonOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
