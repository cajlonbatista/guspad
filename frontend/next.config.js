const withImages = require('next-images');
const withPWA = require('next-pwa');

module.exports = withImages();
module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})