const { extname } = require("path");
const CSS_FILE_EXTENSIONS = [".css", ".scss"];
const importDeclaration = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (
          specifiers.length > 0 &&
          CSS_FILE_EXTENSIONS.includes(extname(value))
        ) {
          source.value = `${value}?css_modules`;
        }
      },
    },
  };
};

module.exports = {
  plugins: [importDeclaration()],
};
