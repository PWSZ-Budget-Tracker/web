module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web/dist/'
    : '/'
}
};
