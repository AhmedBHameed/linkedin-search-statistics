import {act, fireEvent, render} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';

import {lightTheme} from '../../styles/Theme';
import CloseCircleButton from './CircleButton';

function renderComponent(props: {onClick?: () => void} = {}) {
  const {onClick} = props;
  return render(
    <ThemeProvider theme={{colors: lightTheme}}>
      <CloseCircleButton onClick={onClick} />
    </ThemeProvider>
  );
}

describe('CloseCircleButton', () => {
  it('matches snapshot', () => {
    const {container} = renderComponent();

    expect(container).toMatchSnapshot();
  });

  describe('Button functionality', () => {
    it('executes onClick function when clicked', () => {
      const mockButtonOnClick = jest.fn();
      const {getByTestId} = renderComponent({onClick: mockButtonOnClick});

      act(() => {
        fireEvent.click(getByTestId('close-button'));
      });

      expect(mockButtonOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
