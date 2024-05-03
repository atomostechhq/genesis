/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;

// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.module.rules.forEach((rule) => {
//         if (String(rule.test) === "/\\.css$/") {
//           rule.use.forEach((useEntry) => {
//             if (useEntry.loader.includes("css-loader") && useEntry.options) {
//               useEntry.options.modules = true;
//             }
//           });
//         }
//       });
//     }
//     return config;
//   },
// };
