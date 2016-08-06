module.exports = loader

function loader() {
    return [
        require.resolve('./lib/loader.js')
    ].join('!')
}