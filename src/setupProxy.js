const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://home.sensibo.com/api/v2",
      changeOrigin: true,
    })
  );
};
