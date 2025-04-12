if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({
    path: `.env.production`, // or other custom path
  });
} else {
  require('dotenv').config({
    path: `.env.development`, // or other custom path
  });
}

module.exports = {
  siteMetadata: {
    title: `Portfolio`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [],
}