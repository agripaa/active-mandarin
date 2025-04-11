module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          exclude: /node_modules\/html2pdf\.js/,
          use: ["source-map-loader"],
        },
      ],
    },
  };
