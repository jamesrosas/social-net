module.exports = {
  reactStrictMode: true,
  exportPathMap: async function(
    defaultPathMap, {
       dev,
       dir,
       outDir,
       distDir,
       buildId
    }
 ) {
    return {
       '/': {
          page: '/'
       },
       '/home': {
          page: '/home'
       },
       '/compose/tweet': {
          page: '/compose/tweet',
       },
    }
 },
}
