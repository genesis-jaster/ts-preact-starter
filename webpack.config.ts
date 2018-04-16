import * as webpack from "webpack";
import { resolve } from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const { HotModuleReplacementPlugin } = webpack;

interface WebpackEnvironment {
  NODE_ENV: string;
}

module.exports = (env: WebpackEnvironment) => {
  const { NODE_ENV = null } = env;
  const port = 3000;
  const context = resolve(__dirname, "./src");
  const isProd = NODE_ENV === "production";
  const outputPath = resolve(__dirname, "./dist");
  const appEntryPoints = isProd
    ? ["./index"]
    : [
        `webpack-dev-server/client?http://localhost:${port}`,
        "webpack/hot/only-dev-server",
        "./index"
      ];

  const config: webpack.Configuration = {
    context,
    mode: isProd ? "production" : "development",
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    devtool: isProd ? "source-map" : "eval-source-map",
    entry: {
      app: appEntryPoints
    },
    output: {
      filename: "[name].js",
      path: outputPath
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.tsx?$/,
          loader: "tslint-loader",
          exclude: /node_modules/,
          options: {
            configFile: resolve(__dirname, "./tslint.json"),
            emitErrors: true,
            failOnHint: true,
            typeCheck: true
          }
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        hash: true,
        filename: "index.html",
        inject: "body"
      }),
      new HotModuleReplacementPlugin()
    ]
  };

  if (NODE_ENV === "dev") {
    config.devServer = {
      port,
      historyApiFallback: true,
      stats: {
        colors: true
      },
      noInfo: false,
      quiet: false,
      hot: true
    };
  }

  return config;
};
