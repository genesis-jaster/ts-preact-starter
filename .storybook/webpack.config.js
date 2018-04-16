// preLoaders: [
//   {
//     test: /\.tsx?$/,
//     loader: "tslint",
//     exclude: /node_modules/
//   }
// ],

// tslint: {
//   configFile: "./tslint.json",
//   emitErrors: true,
//   failOnHint: true
// }

const { resolve } = require("path");

const rulesToAdd = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader"
      }
    ]
  }
];

const createWebpackConfig = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  const {
    module: { rules },
    plugins,
    resolve: { extensions, alias }
  } = storybookBaseConfig;

  // Make whatever fine-grained changes you need
  storybookBaseConfig.resolve.alias = {
    ...alias,
    react: "preact-compat",
    "react-dom": "preact-compat"
  };
  storybookBaseConfig.resolve.extensions = [...extensions, ".ts", ".tsx"];
  storybookBaseConfig.module.rules = [...rules].concat(rulesToAdd);

  // Return the altered config
  return storybookBaseConfig;
};

module.exports = createWebpackConfig;
