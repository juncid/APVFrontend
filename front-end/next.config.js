const withSass = require("@zeit/next-sass");
const withFonts = require('nextjs-fonts');
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  /* config options here */
})

module.exports = withSass();

module.exports = withFonts();

module.exports = withImages({
    webpack(config, options) {
        return config
    }
})
