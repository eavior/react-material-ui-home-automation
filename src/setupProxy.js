const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "api/v2/users/me/pods",
    createProxyMiddleware({
      target: "https://home.sensibo.com/",
      changeOrigin: true,
    })
  );
};
