const prodPlugins = [
  ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }]
]
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  "env":{
    "development":{
      "sourceMaps":true,
      "retainLines":true,
    }
  },
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    ...prodPlugins
  ],
  presets: ["@vue/cli-plugin-babel/preset"]
};