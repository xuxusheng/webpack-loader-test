var Tokenizer = require('css-selector-tokenizer')
var postcss = require('postcss')

module.exports = function ( selectorStr, scope ) {

    var root = Tokenizer.parse(selectorStr)

    root.nodes = root.nodes.map(function(selector) {

        var newNodes = []
        selector.nodes.forEach(function(item) {

            if (item.type === 'class' || item.type === 'id' || item.type === 'element' || item.type === 'pseudo-element') {
                newNodes.push(item, {
                    type: 'attribute',
                    content: scope
                })
            } else {
                newNodes.push(item)
            }
        })

        selector.nodes = newNodes
        return selector
    })


    return Tokenizer.stringify(root)
}