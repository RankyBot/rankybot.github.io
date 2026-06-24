const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://api.ranky.top',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      })
  );
};

