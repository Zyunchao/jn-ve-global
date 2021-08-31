module.exports = {
    plugins: {
        'autoprefixer': {
            overrideBrowserslist: ['Chrome > 31', 'ff > 31', 'last 2 versions'],
            grid: true
        },
        'postcss-pxtorem': {
            rootValue: 100,
            propList: ['*'],
            unitPrecision: 5
        }
    }
}
