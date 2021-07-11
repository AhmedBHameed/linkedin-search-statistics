import {useContext} from 'react';

import {ViewportContext} from '../ViewportProvider';

const useViewport = () => useContext(ViewportContext);

export default useViewport;
