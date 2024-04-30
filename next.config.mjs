/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Find and modify the existing CSS rule
      const rule = config.module.rules.find(
        r => r.test && r.test.toString().includes('.css')
      );
      if (rule) {
        const cssLoaderIndex = rule.use.findIndex(u => u.loader.includes('css-loader'));
        if (cssLoaderIndex !== -1) {
          rule.use[cssLoaderIndex].options.modules = {
            auto: (resourcePath) => resourcePath.endsWith('.module.css'),
          };
        }
      }
    }

    return config;
  },
};

export default nextConfig;
