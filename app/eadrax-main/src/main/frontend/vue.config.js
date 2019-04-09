module.exports = {
  baseUrl: "/eam",
  devServer: {
    proxy: {
      "/eam/api": {
        target: "http://localhost:9999/eam/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/eam/api": ""
        }
      },
      "/eam/oauth": {
        target: "http://localhost:9999/eam/oauth",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/eam/oauth": ""
        }
      }
    }
  }
};
