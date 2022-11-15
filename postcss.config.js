const _ = require('lodash')
const notRemModes = ['docs', 'dev', 'build', '--px']
const px2Rem = !(_.intersection(process.argv, notRemModes).length >= 2)

module.exports = {
    plugins: {
        'autoprefixer': {
            overrideBrowserslist: ['Chrome > 31', 'ff > 31', 'last 2 versions'],
            grid: true
        },
        'postcss-selector-not': {},
        ...(px2Rem
            ? {
                'postcss-pxtorem': {
                    rootValue: 100,
                    propList: ['*'],
                    unitPrecision: 5
                }
            }
            : {})
    }
}
