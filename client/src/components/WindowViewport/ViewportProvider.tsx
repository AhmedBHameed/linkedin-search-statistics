import React, {createContext, useEffect, useState} from 'react';

import devices from '../../styles/mediaQueries';

interface ViewportSettings {
  isTabletOrLarger?: boolean;
  isDesktopOrLarger?: boolean;
  isTvOrLarger?: boolean;
  isBigTvOrLarger?: boolean;
}

export const ViewportContext = createContext<ViewportSettings>({});

const ViewportProvider: React.FC = ({children}) => {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState<boolean | undefined>(
    undefined
  );
  const [isDesktopOrLarger, setIsDesktopOrLarger] = useState<
    boolean | undefined
  >(undefined);
  const [isTvOrLarger, setIsTvOrLarger] = useState<boolean | undefined>(
    undefined
  );
  const [isBigTvOrLarger, setIsBigTvOrLarger] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const tabletMatch = window.matchMedia(devices.mdMediaQuery);
    const desktopMatch = window.matchMedia(devices.lgMediaQuery);
    const tvMatch = window.matchMedia(devices.xlMediaQuery);
    const bigTvMatch = window.matchMedia(devices.xxlMediaQuery);
    function handleTabletResize() {
      setIsTabletOrLarger(tabletMatch.matches);
    }
    function handleDesktopResize() {
      setIsDesktopOrLarger(desktopMatch.matches);
    }
    function handleTvResize() {
      setIsTvOrLarger(tvMatch.matches);
    }
    function handleBigTvResize() {
      setIsBigTvOrLarger(bigTvMatch.matches);
    }

    if (tabletMatch.addEventListener) {
      tabletMatch.addEventListener('change', handleTabletResize);
      desktopMatch.addEventListener('change', handleDesktopResize);
      tvMatch.addEventListener('change', handleTvResize);
      bigTvMatch.addEventListener('change', handleBigTvResize);
    } else if ((tabletMatch as any).attachEvent) {
      (tabletMatch as any).attachEvent('change', handleTabletResize);
      (desktopMatch as any).attachEvent('change', handleDesktopResize);
      (tvMatch as any).attachEvent('change', handleTvResize);
      (bigTvMatch as any).attachEvent('change', handleBigTvResize);
    }

    // Call handler right a away so state gets updated with initial window size
    handleTabletResize();
    handleDesktopResize();
    handleTvResize();
    handleBigTvResize();

    return () => {
      if ((tabletMatch as any).addEventListener) {
        tabletMatch.removeEventListener('change', handleTabletResize);
        desktopMatch.removeEventListener('change', handleDesktopResize);
        tvMatch.removeEventListener('change', handleTvResize);
        bigTvMatch.removeEventListener('change', handleBigTvResize);
      } else if ((tabletMatch as any).attachEvent) {
        (tabletMatch as any).detachEvent('change', handleTabletResize);
        (desktopMatch as any).detachEvent('change', handleDesktopResize);
        (tvMatch as any).detachEvent('change', handleTvResize);
        (bigTvMatch as any).detachEvent('change', handleBigTvResize);
      }
    };
  }, []);

  return (
    <ViewportContext.Provider
      value={{
        isTabletOrLarger,
        isDesktopOrLarger,
        isTvOrLarger,
        isBigTvOrLarger,
      }}
    >
      {isTabletOrLarger !== undefined && children}
    </ViewportContext.Provider>
  );
};

export default ViewportProvider;
