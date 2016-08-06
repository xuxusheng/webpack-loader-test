var postcss = require('postcss')
var processSelector = require('./processSelector')
var loaderUtils = require('loader-utils')

module.exports = function (source) {
    if(this.cacheable) this.cacheable();
    var callback = this.async()
    var query = loaderUtils.parseQuery(this.query)
    
    if (typeof query.scope === 'undefined') callback(null, source)
    
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