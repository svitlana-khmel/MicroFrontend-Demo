// const { ModuleFederationPlugin } = require("webpack").container;

// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       webpackConfig.plugins.push(
//         new ModuleFederationPlugin({
//           name: "Host",
//           remotes: {
//             MicroFrontend: "MicroFrontend@http://localhost:3000/remoteEntry.js",
//           },
//           shared: {
//             react: { singleton: true, requiredVersion: "18.2.0" },
//             "react-dom": { singleton: true, requiredVersion: "18.2.0" },
//           },
//         })
//       );
//       return webpackConfig;
//     },
//   },
// };
