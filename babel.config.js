module.exports = {
    presets: [
        ['@vue/cli-plugin-babel/preset', {
            useBuiltIns: 'usage',
            targets: {
                browsers: '> 1%, last 2 versions, not dead'
            }
        }]
    ]
}
