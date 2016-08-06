var postcss = require('postcss')
var processSelector = require('./processSelector')
var loaderUtils = require('loader-utils')

module.exports = function (source) {

    // 缓存
    if(this.cacheable) this.cacheable();
    var callback = this.async()
    var query = loaderUtils.parseQuery(this.query)

    // 如果未获取到scope参数，则直接返回
    if (!query.scope) {
        callback(null, source)
        return
    }
    
    var root = postcss.parse(source)
    
    root.walkRules(rule => {
        rule.selector = processSelector(rule.selector, query.scope)
    })
    
    var newCss = ''
    postcss.stringify(root, function( str ) {
        newCss += str
    })
    
    callback(null, newCss)
}