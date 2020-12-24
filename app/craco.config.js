const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#7E5DEA',
              '@font-size-base': '13px',
              '@border-radius': '20px',
              '@error-color': '#ff5f5f',
              '@box-shadow-base': '0px 1px 5px 0px rgba(214,215,255,0.75), 0px 1px 5px 0px rgba(214,215,255,0.75), 0px 1px 5px 0px rgba(214,215,255,0.75)'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
