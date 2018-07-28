'use strict';
var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');
var WebfontPlugin = require('webpack-webfont')['default'];

var plugins = [
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'src/styles/icons'),
      glob: '*.png'
    },
    target: {
      image: path.resolve(__dirname, 'src/assets/images/sprite.png'),
      css: path.resolve(__dirname, 'src/styles/_ui-sprite.scss')
    },
    apiOptions: {
      cssImageRef: "assets\/images\/sprite.png",
      generateSpriteName: function (sprite) {
        return 'icon-' + path.basename(sprite, '.png');
      }
    }
  }),
  new WebfontPlugin({
    files: path.resolve(__dirname, 'src/styles/svg/*.svg'),
    css: true,
    cssTemplateFontPath: 'assets/fonts/',
    fontName: 'ui-icons',
    cssTemplateFontName: 'ui-icons',
    template: 'scss',
    normalize: true,
    verbose: true,
    fontStyle: 'normal !important',
    dest: {
      fontsDir: path.resolve(__dirname, 'src/assets/fonts'),
      stylesDir: path.resolve(__dirname, 'src/styles'),
    }
  })
];

module.exports = {
  context: __dirname,

  entry: {'doNotTouch': './doNotTouch.ts'},

  output: {
    path: __dirname,
    filename: '[name].js'
  },

  plugins: plugins,

  module: {
    rules: []
  }
};
