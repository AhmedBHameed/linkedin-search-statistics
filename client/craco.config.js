const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#047CB3',
              'secondary-color': '#BF5502',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
