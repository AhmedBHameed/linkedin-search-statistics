import {VectorMap} from '@south-paw/react-vector-maps';
import {getAlpha2Code, registerLocale} from 'i18n-iso-countries';
import countriesEnJson from 'i18n-iso-countries/langs/en.json';
import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import worldMap from './world.json';

registerLocale(countriesEnJson);

const MapContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['locationsAlphaCods', 'selectedCountryAsAlphaCode'].includes(prop),
})<{locationsAlphaCods: string[]; selectedCountryAsAlphaCode?: string}>(
  (props) => {
    const {locationsAlphaCods, selectedCountryAsAlphaCode} = props;

    return `
    svg {
      stroke: #fff;
  
      // All layers are just path elements
      path {
        fill: gray;
        cursor: pointer;
        outline: none;
  
        // When a layer is hovered
        &:hover {
          fill: rgba(168, 43, 43, 0.83);
        }
  
        // When a layer is focused.
        &:focus {
          fill: rgba(168, 43, 43, 0.6);
        }
  
        // When a layer is 'checked' (via checkedLayers prop).
        &[aria-checked='true'] {
          fill: rgba(56, 43, 168, 1);
        }
  
        // When a layer is 'selected' (via currentLayers prop).
        &[aria-current='true'] {
          fill: rgba(56, 43, 168, 0.83);
        }
  
        // You can also highlight a specific layer via it's id
        ${locationsAlphaCods
          .map(
            (alphaCode) => `
            // When a layer is hovered
            &:hover {
              fill: rgba(168, 43, 43, 0.83);
            }
      
            // When a layer is focused.
            &:focus {
              fill: rgba(168, 43, 43, 0.6);
            }
 

            // Color countries that has statistics data
            &[id='${alphaCode}'] {
                fill: rgba(4, 124, 179, 0.6);
                &:hover {
                  fill: rgba(168, 43, 43, 0.6);
                }
                &:focus {
                  fill: rgba(168, 43, 43, 0.83);
                }
              }
        
            // Default selected country styled
            ${
              selectedCountryAsAlphaCode === alphaCode
                ? `
                      &[id='${selectedCountryAsAlphaCode}'] {
                          fill: rgba(168, 43, 43, 0.83);
                      }
                  `
                : ''
            }
            `
          )
          .join('\n')}
        
      }
    }
  `;
  }
);

interface WorldVectorMapProps {
  locations?: string[];
  selectedCountryName: string | null;
  onAreaClick?: (countryName: string) => void;
}

const WorldVectorMap: React.FC<WorldVectorMapProps> = ({
  locations,
  selectedCountryName,
  onAreaClick,
}) => {
  const locationsAlphaCods = useMemo(
    () =>
      locations?.map((location) =>
        getAlpha2Code(location || '', 'en')?.toLowerCase()
      ) || [],
    [locations]
  );

  const handleOnClick = useCallback(
    ({target}: any) => {
      const countryName = target.attributes.name.value.toLowerCase();
      if (locations?.includes(countryName)) onAreaClick?.(countryName);
    },
    [locations, onAreaClick]
  );

  return (
    <MapContainer
      locationsAlphaCods={locationsAlphaCods}
      selectedCountryAsAlphaCode={getAlpha2Code(
        selectedCountryName || '',
        'en'
      )?.toLowerCase()}
    >
      <VectorMap {...worldMap} layerProps={{onClick: handleOnClick}} />
    </MapContainer>
  );
};

export default WorldVectorMap;
