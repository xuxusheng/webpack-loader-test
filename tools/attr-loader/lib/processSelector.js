var Tokenizer = require('css-selector-tokenizer')
var postcss = require('postcss')

module.exports = function ( selectorStr, scope ) {

    // 使用 Tokenizer 将选择器字符串转换为语法树
    var root = Tokenizer.parse(selectorStr)

    root.nodes = root.nodes.map(function(selector) {

        var newNodes = []
        selector.nodes.forEach(function(item) {

            // 如果当前的选择器为“类选择器”、“ID选择器”、“标签选择器” 以及 “伪元素选择器”，则在后面追加上自定义属性选择器
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

    // 将处理过的语法树重新转换为选择器字符串
    return Tokenizer.stringify(root)
}