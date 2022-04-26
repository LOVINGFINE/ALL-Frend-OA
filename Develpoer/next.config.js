const path = require("path");

module.exports = {
  useFileSystemPublicRoutes: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
