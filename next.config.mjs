// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       const rule = config.module.rules.find(r => String(r.test) === String(/\.css$/));
//       if (rule) {
//         const cssLoader = rule.use.find(u => u.loader && u.loader.includes('css-loader'));
//         if (cssLoader) {
//           cssLoader.options.modules = {
//             auto: (resourcePath) => resourcePath.endsWith('.module.css'),
//           };
//         }
//       }
//     }

//     return config;
//   },
// };

// export default nextConfig;


const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.forEach(rule => {
        if (String(rule.test) === '/\\.css$/') {
          rule.use.forEach(useEntry => {
            if (useEntry.loader.includes('css-loader') && useEntry.options) {
              // Adjust CSS loader options here if necessary
            }
          });
        }
      });
    }
    return config;
  },
};
