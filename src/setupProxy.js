const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v2/users/me/pods?apiKey=A0LNcq1cmkkWv4XHKd7IARqBqPOw4c",
    createProxyMiddleware({
      target: "https://home.sensibo.com",
      changeOrigin: true,
    })
  );
};
