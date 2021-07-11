import {renderHook} from '@testing-library/react-hooks';
import {mockMediaQuery} from '../../setupTests';

import {lg, md, sm, xl, xxl} from '../../styles/mediaQueries';
import useViewport from './hooks/windowViewportHook';
import ViewportProvider from './ViewportProvider';

/**
 * Break points @see https://ant.design/components/layout/#breakpoint-width
 */

describe('ViewportProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mobile components on screen smaller than tablet', async () => {
    mockMediaQuery(md, sm);

    const {result} = renderHook(useViewport, {
      wrapper: ViewportProvider,
    });

    expect(result.current?.isTabletOrLarger).toBeFalsy();
  });

  it('renders tablet components on screen equal or larger than tablet screen', async () => {
    mockMediaQuery(md, md);

    const {result} = renderHook(useViewport, {
      wrapper: ViewportProvider,
    });

    expect(result.current?.isTabletOrLarger).toBeTruthy();
  });

  it('renders desktop components on screen equal or larger than tablet screen', async () => {
    mockMediaQuery(md, lg);

    const {result} = renderHook(useViewport, {
      wrapper: ViewportProvider,
    });

    expect(result.current?.isDesktopOrLarger).toBeTruthy();
  });

  it('renders TV components on screen equal or larger than TV screen', async () => {
    mockMediaQuery(md, xl);

    const {result} = renderHook(useViewport, {
      wrapper: ViewportProvider,
    });

    expect(result.current?.isDesktopOrLarger).toBeTruthy();
  });

  it('renders big TV components on screen equal or larger than big TV screen', async () => {
    mockMediaQuery(md, xxl);

    const {result} = renderHook(useViewport, {
      wrapper: ViewportProvider,
    });

    expect(result.current?.isDesktopOrLarger).toBeTruthy();
  });
});
