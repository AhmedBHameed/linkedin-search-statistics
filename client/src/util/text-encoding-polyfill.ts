// text-encoding-polyfill.js

export function textEncodingFun(
  window: Window & {TextEncoder: any; TextDecoder: any}
) {
  if (typeof window.TextEncoder !== 'function') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const TextEncodingPolyfill = require('text-encoding');
    window.TextEncoder = TextEncodingPolyfill.TextEncoder;
    window.TextDecoder = TextEncodingPolyfill.TextDecoder;
  }
}

textEncodingFun(window);
